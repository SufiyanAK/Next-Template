'use client';

import { colors } from '@/utils/customStyles';
import { Anchor, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface CreateProjectCardComponentProps {
    hasIcon: boolean;
    Icon?: ReactNode;
    color?: string;
    title: string;
    description: string;
    onClickPath: string;
}

const CreateProjectCardComponent: FC<CreateProjectCardComponentProps> = ({ hasIcon, title, description, Icon, color = colors.primary, onClickPath }) => {
    const router = useRouter();

    const handleOnClick = () => {
        router.push(onClickPath);
    }

    return (
        <Anchor
            underline='never'
            onClick={handleOnClick}
            style={{
                backgroundColor: colors.white,
                padding: '24px',
                borderRadius: '8px',
                border: `1px solid ${colors.light}`,
                minHeight: '120px',
                width: '100%',
                maxWidth: '390px',
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
        >
            <Group gap={12}>
                {hasIcon && Icon}
                <Text size='lg' c={color}>{title}</Text>
            </Group>
            <Text c={colors.textSecondary} size="sm" style={{ lineHeight: 1.5 }}>
                {description}
            </Text>
        </Anchor>
    )
}

export default CreateProjectCardComponent