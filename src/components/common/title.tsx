'use client';

import { colors } from '@/utils/customStyles';
import { Group, Stack, Text, Title } from '@mantine/core';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface TitleComponentProps {
    isBackButton?: boolean;
    title?: string;
    backButtonPath?: string;
    description?: string;
}

const TitleComponent: FC<TitleComponentProps> = ({ isBackButton = false, backButtonPath, title, description }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleBackButtonClick = () => {
        if (backButtonPath) {
            router.push(backButtonPath);
            return;
        }
        router.back();
    }

    return (
        <Group>
            {isBackButton && <ChevronLeft
                size={28}
                style={{
                    cursor: 'pointer',
                    transform: isHovered ? 'scale(1.4)' : 'scale(1.2)',
                    transition: 'transform 0.2s ease'
                }}
                onClick={handleBackButtonClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />}
            <Stack gap={4}>
                <Title order={2}>{title}</Title>
                <Text size="md" c={colors.textSecondary}>{description}</Text>
            </Stack>
        </Group>
    )
}

export default TitleComponent