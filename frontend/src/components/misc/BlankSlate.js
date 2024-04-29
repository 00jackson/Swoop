import { Center, Text } from '@chakra-ui/react';
// import { MotionBox } from '@chakra-ui/react';
import { motion } from 'framer-motion';



const BlankSlate = () => {
    return (
        <Center h="full" position="relative">
            {/* Animation */}
            <div
                position="absolute"
                top="-20%"
                left="50%"
                animate={{
                    y: [-20, 20, -20], // y-axis movement
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1], // scale
                }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    loop: Infinity,
                }}
            >
                {/* Your animated cartoon element */}
                <motion.img src={"animations/say-hello-to-new-people.png"} alt="cartoon animation" />
            </div>

            {/* Text */}
            <Text fontSize="xl" color="gray.500" zIndex="1">
                Click on a user to start chatting
            </Text>
        </Center>
    );
};

export default BlankSlate;
