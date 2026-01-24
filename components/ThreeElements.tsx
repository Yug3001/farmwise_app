
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- Components ---

export const HeroPlant = (props: any) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle rotation
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            // Bobbing motion is handled by Float, but we can add secondary animation here
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef} {...props} dispose={null}>
                {/* Pot */}
                <mesh position={[0, -1, 0]}>
                    <cylinderGeometry args={[0.8, 0.6, 1.2, 32]} />
                    <meshStandardMaterial color="#8D6E63" roughness={0.8} />
                </mesh>

                {/* Soil */}
                <mesh position={[0, -0.45, 0]}>
                    <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
                    <meshStandardMaterial color="#4E342E" roughness={1} />
                </mesh>

                {/* Stem */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.08, 0.1, 2, 8]} />
                    <meshStandardMaterial color="#558B2F" />
                </mesh>

                {/* Leaves - Low Poly style */}
                <group position={[0, 0.2, 0]}>
                    <mesh position={[0.4, 0.5, 0]} rotation={[0, 0, -0.5]}>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshStandardMaterial color="#7CB342" />
                    </mesh>
                    <mesh position={[-0.4, 0.8, 0]} rotation={[0, 0, 0.5]}>
                        <sphereGeometry args={[0.25, 16, 16]} />
                        <meshStandardMaterial color="#7CB342" />
                    </mesh>
                    <mesh position={[0, 1.2, 0.3]} rotation={[0.4, 0, 0]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color="#7CB342" />
                    </mesh>
                </group>

                {/* Top Flower/Fruit */}
                <mesh position={[0, 1.6, 0]}>
                    <dodecahedronGeometry args={[0.4]} />
                    <meshStandardMaterial color="#FB8C00" emissive="#FB8C00" emissiveIntensity={0.2} />
                </mesh>
            </group>
        </Float>
    );
};

export const FloatingParticles = ({ count = 20 }) => {
    const points = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={points}>
            {Array.from({ length: count }).map((_, i) => {
                const x = (Math.random() - 0.5) * 15;
                const y = (Math.random() - 0.5) * 10;
                const z = (Math.random() - 0.5) * 10 - 5;
                const scale = Math.random() * 0.1 + 0.05;

                return (
                    <Float key={i} speed={Math.random() * 2 + 1} rotationIntensity={1} floatIntensity={2}>
                        <mesh position={[x, y, z]}>
                            <sphereGeometry args={[scale, 8, 8]} />
                            <meshBasicMaterial color="#74C69D" transparent opacity={0.4} />
                        </mesh>
                    </Float>
                );
            })}
        </group>
    );
};

export const CanvasContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Environment preset="city" />
                {children}
            </Canvas>
        </div>
    );
};

export const HeroDisplay = () => {
    return (
        <div className="w-full h-full bg-gradient-to-b from-blue-50/50 to-green-50/50 dark:from-slate-900/50 dark:to-slate-800/50">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[5, 10, 5]} intensity={1.5} />
                <Environment preset="forest" />
                <HeroPlant scale={1.2} position={[0, -0.5, 0]} />
                <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
            </Canvas>
        </div>
    );
};
