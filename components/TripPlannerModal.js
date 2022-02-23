import React from 'react';

import { Modal, ModalOverlay, ModalContent, ModalBody, Heading, Text, Image, ModalHeader, Square, Flex, Spacer } from '@chakra-ui/react'
import { FaShareAlt } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import ScrollGlow from './ScrollGlow';

const TripPlannerModal = () => {
    return (

        <Modal size={'3xl'} isOpen={false}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>
                    <Flex>

                        <Square>
                            <FaShareAlt />
                        </Square>
                        <Spacer />
                        <GrClose />

                    </Flex>

                    <ScrollGlow>
                        <Image width={'330px'} height={'220px'} mr={2} src='/images/trip-planner.png' />
                        <Image width={'330px'} height={'220px'} mr={2} src='/images/trip-planner.png' />
                        <Image width={'330px'} height={'220px'} mr={2} src='/images/trip-planner.png' />
                        <Image width={'330px'} height={'220px'} mr={2} src='/images/trip-planner.png' />
                        <Image width={'330px'} height={'220px'} mr={2} src='/images/trip-planner.png' />
                        <Image width={'330px'} height={'220px'} mr={2} src='/images/trip-planner.png' />
                    </ScrollGlow>

                </ModalHeader>
                <ModalBody>
                    <Heading>Glenwild Golf Club</Heading>
                    <Text>8658 N. Lexington Street Park City, UT 84098</Text>

                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. In nulla posuere sollicitudin aliquam ultrices sagittis. Et malesuada fames ac turpis egestas sed tempus urna et. Dictum at tempor commodo ullamcorper. Sit amet purus gravida quis. Dui ut ornare lectus sit amet. Velit scelerisque in dictum non consectetur a erat nam at. Sit amet volutpat consequat mauris nunc congue. Sit amet consectetur adipiscing elit.
                    </Text>

                    <Image />


                    <ol>
                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                        <li>Lorem ipsum dmet, consectetuer adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet,nsecteiscing elit.</li>
                        <li>Lorem ipsm dolot amet, consectpiscing elit.</li>
                        <li> ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                        <li>Lorem ipsum dolor snsectetuer adipiscing elit.</li>
                    </ol>

                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero.
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default TripPlannerModal;
