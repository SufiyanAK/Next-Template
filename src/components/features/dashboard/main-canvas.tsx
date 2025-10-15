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
import { useCallback, useMemo } from 'react';
import ActivityNode from './activity-node';
import { Plus } from 'lucide-react';

import '@xyflow/react/dist/style.css';

interface MainCanvasComponentProps {
    onActivityConfig?: (nodeId: string, activityType: string) => void;
}

const MainCanvasComponent = ({ onActivityConfig }: MainCanvasComponentProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    console.log("Nodes =>>>>>>>> ", nodes);
    console.log("Edges =>>>>>>>> ", edges);

    const nodeTypes: NodeTypes = useMemo(() => ({
        activityNode: ActivityNode,
    }), []);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleActivityConfig = useCallback((nodeId: string, activityType: string) => {
        onActivityConfig?.(nodeId, activityType);
    }, [onActivityConfig]);

    const handleDeleteNode = useCallback((nodeId: string) => {
        setNodes((nodes: any) => nodes.filter((node: any) => node.id !== nodeId));
        setEdges((edges: any) => edges.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId));
    }, [setNodes, setEdges]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const activityData = JSON.parse(event.dataTransfer.getData('application/activity'));

            console.log("Activity Data => ", activityData);
            console.log("Type => ", type);

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

            setNodes((nds: any) => nds.concat(newNode));
        },
        [setNodes, handleActivityConfig, handleDeleteNode]
    );

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
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
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