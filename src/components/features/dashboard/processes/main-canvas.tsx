'use client';

import { colors } from '@/utils/customStyles';
import { Box, Group, Text, Stack } from '@mantine/core';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    NodeTypes,
    BackgroundVariant
} from '@xyflow/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import ActivityNode from '../activity-node';
import { Plus } from 'lucide-react';
import { ProcessActivityDetail } from '@/types/process.types';

import '@xyflow/react/dist/style.css';

interface MainCanvasComponentProps {
    onActivityConfig?: (nodeId: string, activityType: string) => void;
    onNodeSelect?: (node: { id: string; type: string; label: string; data: any } | null) => void;
    onNodesChange?: (nodes: any[]) => void;
    initialActivities?: ProcessActivityDetail[];
}

const MainCanvasComponent = ({ onActivityConfig, onNodeSelect, onNodesChange, initialActivities }: MainCanvasComponentProps) => {
    const [nodes, setNodes, onNodesChange_Internal] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const initializedRef = useRef(false);

    // Helper function to get activity label based on type
    const getActivityLabel = useCallback((type: string): string => {
        const labels: { [key: string]: string } = {
            'read-email': 'Read Email',
            'assign': 'Assign',
            'reply-email': 'Reply Email',
            'erp-config': 'ERP Config'
        };
        return labels[type] || type;
    }, []);

    // Define callback functions
    const handleActivityConfig = useCallback((nodeId: string, activityType: string) => {
        onActivityConfig?.(nodeId, activityType);
    }, [onActivityConfig]);

    const handleDeleteNode = useCallback((nodeId: string) => {
        setNodes((nodes: any) => nodes.filter((node: any) => node.id !== nodeId));
        setEdges((edges: any) => edges.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId));
    }, [setNodes, setEdges]);

    // Map activities to nodes and edges on initial load (only once)
    useEffect(() => {
        if (initialActivities && initialActivities.length > 0 && !initializedRef.current) {
            initializedRef.current = true;

            // Sort activities by sortOrder
            const sortedActivities = [...initialActivities].sort((a, b) => a.sortOrder - b.sortOrder);

            // Create nodes from activities
            const initialNodes = sortedActivities.map((activity, index) => {
                const nodeId = `node-${activity.id}`;
                const yPosition = 100 + (index * 150); // Space nodes vertically

                return {
                    id: nodeId,
                    type: 'activityNode',
                    position: { x: 250, y: yPosition },
                    data: {
                        label: getActivityLabel(activity.type),
                        description: `Activity ${activity.sortOrder}`,
                        activityType: activity.type,
                        activityData: {
                            type: activity.type,
                            ...activity.details
                        },
                        onConfigClick: () => handleActivityConfig(nodeId, activity.type),
                        onDeleteClick: () => handleDeleteNode(nodeId),
                    }
                };
            });

            // Create edges connecting sequential nodes
            const initialEdges = [];
            for (let i = 0; i < initialNodes.length - 1; i++) {
                initialEdges.push({
                    id: `edge-${i}`,
                    source: initialNodes[i].id,
                    target: initialNodes[i + 1].id,
                    type: 'smoothstep',
                    animated: true,
                });
            }

            setNodes(initialNodes as any);
            setEdges(initialEdges as any);
        }
    }, [initialActivities, getActivityLabel, handleActivityConfig, handleDeleteNode, setNodes, setEdges]);

    // Notify parent component when nodes change (only after initialization and using ref to avoid dep issues)
    const onNodesChangeRef = useRef(onNodesChange);

    useEffect(() => {
        onNodesChangeRef.current = onNodesChange;
    }, [onNodesChange]);

    useEffect(() => {
        if (initializedRef.current && onNodesChangeRef.current) {
            onNodesChangeRef.current(nodes);
        }
    }, [nodes]);

    const nodeTypes: NodeTypes = useMemo(() => ({
        activityNode: ActivityNode,
    }), []);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onNodeClick = useCallback((_: any, node: any) => {
        onNodeSelect?.({
            id: node.id,
            type: node.type,
            label: node.data.label,
            data: node.data
        });
    }, [onNodeSelect]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const activityData = JSON.parse(event.dataTransfer.getData('application/activity'));

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const reactFlowBounds = (event.target as Element).getBoundingClientRect();
            const position = {
                x: event.clientX - reactFlowBounds.left - 100, // Center the node
                y: event.clientY - reactFlowBounds.top - 40,
            };

            const nodeId = `${type}-${Date.now()}`;
            const newNode = {
                id: nodeId,
                type: 'activityNode',
                position,
                data: {
                    label: activityData.name,
                    description: activityData.description,
                    activityType: activityData.id,
                    onConfigClick: () => handleActivityConfig(nodeId, activityData.id),
                    onDeleteClick: () => handleDeleteNode(nodeId),
                },
            };
            setNodes((nds: any) => {
                const temp = nds.concat(newNode);
                return temp;
                // return nds.concat(newNode)
            });
        },
        [setNodes, handleActivityConfig, handleDeleteNode]
    );

    // Don't automatically sync nodes to processData.activities
    // Activities should only be updated when saved through the modal
    // This useEffect is removed to prevent overwriting activity data when nodes change
    // The visual nodes and the activity data are separate concerns:
    // - Nodes represent the visual flow diagram
    // - processData.activities contains the actual configuration data
    // They are linked by activity type, but node changes shouldn't wipe out saved activity data


    return (
        <Box
            style={{
                flex: 1,
                height: '100%',
                backgroundColor: colors.background,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Canvas Toolbar */}
            <Group
                justify='space-between'
                px={16}
                py={12}
                style={{
                    borderBottom: `1px solid ${colors.tertiary}`,
                    backgroundColor: colors.white
                }}
            >
                <Group gap={8}>
                    <Text size="sm" c={colors.textSecondary}>
                        Process: New process
                    </Text>
                    <Text size="sm" c={colors.textSecondary}>
                        /
                    </Text>
                    <Text size="sm" c={colors.textSecondary}>
                        Main Flow
                    </Text>
                </Group>
            </Group>

            {/* React Flow Canvas */}
            <Box style={{ height: 'calc(100% - 56px)', position: 'relative' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange_Internal}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    style={{
                        backgroundColor: colors.background,
                    }}
                >
                    <Background
                        variant={BackgroundVariant.Lines}
                        gap={20}
                        size={1}
                        color={colors.tertiary}
                    />
                    <Controls />
                </ReactFlow>

                {/* Empty State Overlay */}
                {nodes.length === 0 && (
                    <Box
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                    >
                        <Stack align="center" gap={16}>
                            <Box
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: colors.white,
                                    border: `2px dashed ${colors.tertiary}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Plus size={24} color={colors.textSecondary} />
                            </Box>
                            <Stack align="center" gap={4}>
                                <Text size="sm" fw={500} c={colors.textPrimary}>
                                    Start building your workflow
                                </Text>
                                <Text size="xs" c={colors.textSecondary} style={{ maxWidth: '200px' }}>
                                    Drag activities from the left panel to create your automation process
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MainCanvasComponent;