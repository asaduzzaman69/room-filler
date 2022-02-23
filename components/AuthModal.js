import { Box, Button, ButtonSpinner, Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, PinInput, PinInputField, Select, Spinner, Text } from '@chakra-ui/react';
import { ChatIcon, ChevronDownIcon, ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons'

import React, { createContext, useContext, useMemo } from 'react';
import { useState } from 'react';
import CustomInput from './CustomInput';
import DatePicker from "react-datepicker";
import { phoneSignIn } from '../lib/firebase';
import firebase, { auth, firestore } from 'firebase';


/* 
    Auth Proccess
    Phone Number -- Otp -- numberSignUp Form
    
    
    */

const AuthContext = createContext({})
const onChange = (name, e, cb) => {
    cb(name, e.target.value)
}




export const EmailForm = ({ setAuth }) => {

    const { userData: { email }, setContextState } = useContext(AuthContext);


    return (
        <>
            <Text fontWeight={600} fontSize={'xl'} mt={7} mb={5}>Welcome to StaySTG</Text>
            <CustomInput placeholder={'Email'} value={email} onChange={(e) => {
                setContextState('email', e.target.value)
            }} />
            <br />
            <Button height={'43px'} onClick={() => setAuth('emailSignUp')} borderRadius={'8px'} bg={'#18A7B9'} color={'white'} textTransform={'capitalize'} w={'100%'}>Continue</Button>
            <Flex mt={6} alignItems={'center'}>
                <Box mr={2} flex={1} height={'1px'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'} />
                <Text fontSize={'14px'} fontWeight={'semibold'} color={'#6B6B6B'} >or</Text>
                <Box ml={2} flex={1} height={'1px'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'} />
            </Flex>
            <Button onClick={() => setAuth('phoneNumber')} height={'43px'} fontSize={'15px'} color={'#6B6B6B'} borderRadius={'8px'} bg={'transparent'} border={'2px solid #A9A9A9;'} display={'grid'} gridTemplateColumns={'min-content 1fr'} mb={7} width={'100%'} mt={5}>
                <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 0H2.5C1.12 0 0 1.12 0 2.5V19.5C0 20.88 1.12 22 2.5 22H10.5C11.88 22 13 20.88 13 19.5V2.5C13 1.12 11.88 0 10.5 0ZM6.5 21C5.67 21 5 20.33 5 19.5C5 18.67 5.67 18 6.5 18C7.33 18 8 18.67 8 19.5C8 20.33 7.33 21 6.5 21ZM11 17H2V3H11V17Z" fill="#6B6B6B" />
                </svg>
                <Text textTransform={'capitalize'} >Continue with Phone</Text>
            </Button>
        </>
    )
}

export const PhoneNumberForm = ({ setAuth }) => {
    const { userData: { phoneNumber }, setContextState } = useContext(AuthContext);
    return (
        <>
            <Text fontWeight={600} fontSize={'xl'} mt={7} mb={5}>Welcome to StaySTG</Text>


            <Box>
                <CustomInput value={'United States (+1)'} placeholder={"Country/Region"} sx={{
                    borderTopLeftRadius: '8px',
                    borderBottomRadius: '0',
                    borderBottom: '0',
                    borderTopRightRadius: '8px'
                }}>
                    <InputRightElement
                        children={<ChevronDownIcon />}
                    />

                    <Box top={'8px'} pos={'absolute'} w={'100%'} zIndex={99999}>
                        <Select icon={''} opacity={0}  >
                            <option>United States (+1)</option>
                            <option>Canada (+1)</option>

                        </Select>
                    </Box>

                </CustomInput>
                <CustomInput value={phoneNumber} onChange={(e) => {
                    setContextState('phoneNumber', e.target.value)
                }} placeholder={'Phone Number'} sx={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomRadius: '8px',
                    borderBottom: '2px solid #E5E5E5',
                }}>

                </CustomInput>
            </Box>
            <Box mb={6}>
                <Text fontSize={'14px'} color={'#999999'} fontWeight={500} >
                    We’ll call or text you to confirm your number. Standard message and data rates apply. <Text textDecor={'underline'} color={'#1E68D8'} display={'inline-block'}>Privacy Policy.</Text>
                </Text>


            </Box>
            <div id="recaptcha-container"></div>

            <Button height={'43px'} onClick={async () => {
                const finalPhoneNumber = '+1' + ' ' + phoneNumber;
                await phoneSignIn(finalPhoneNumber, (val) => setContextState('firebaseOtp', val));
                setAuth('otpVerification')
            }} borderRadius={'8px'} bg={'#18A7B9'} color={'white'} textTransform={'capitalize'} w={'100%'}>Continue</Button>
            <Flex mt={6} alignItems={'center'}>
                <Box mr={2} flex={1} height={'1px'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'} />
                <Text fontSize={'14px'} fontWeight={'semibold'} color={'#6B6B6B'} >or</Text>
                <Box ml={2} flex={1} height={'1px'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'} />
            </Flex>
            <Button height={'43px'} onClick={() => setAuth('email')} fontSize={'15px'} color={'#6B6B6B'} borderRadius={'8px'} bg={'transparent'} border={'2px solid #A9A9A9;'} display={'grid'} gridTemplateColumns={'min-content 1fr'} mb={7} width={'100%'} mt={5}>
                <ChatIcon />
                <Text textTransform={'capitalize'}>Continue with Email</Text>
            </Button>
        </>
    )
}

export const NumberPinVerify = ({ setAuth }) => {
    const { userData: { firebaseOtp }, setContextState } = useContext(AuthContext);
    const [otp, setOtp] = useState();
    const [isOtpSenting, setIsOtpSenting] = useState(false);
    const [isWrongOtp, setIsWrongOtp] = useState(false);

    const background = 'rgba(248, 248, 248, 1)';

    const pinInputStyles = {
        width: '4rem',

        height: '3.7rem',
        borderRadius: '1rem',
        fontSize: '2.5rem',

        _placeholder: {
            fontSize: '5rem',
            fontWeight: 'medium',
            color: '#313131',
        },
        _focus: {
            background: { background },
            border: '1px solid #313131',
        },
        _active: {
            background: { background },
            border: '1px solid #313131',
        },
    };

    return (
        <Box my={6}>
            <Text color={'#6B6B6B'} fontWeight={500} >Enter the code we sent over SMS to +1(000)000-0000:</Text>
            <Box my={6}>
                <Box>

                    <PinInput onChange={(e) => {
                        console.log(e)
                        if (e.length === 6) {
                            setIsOtpSenting(true)
                            firebaseOtp.confirm(e).then(async ({ user }) => {

                                try {

                                    let userDoc = await firestore().doc(`users/${user.uid}`).get();

                                    setIsOtpSenting(false)

                                    if (!userDoc.exists) {
                                        setAuth('numberSignUp')
                                        setContextState('userAuth', user)
                                    } else {
                                        //    sent to password filling step
                                    }
                                } catch (err) {
                                }



                            }).catch(err => {

                                setIsOtpSenting(false);
                                setIsWrongOtp(true)
                                console.log(err)
                            })
                        }


                    }} size={'lg'} placeholder={''}>
                        <PinInputField sx={pinInputStyles} borderRadius={'12px'} mr={3} />
                        <PinInputField sx={pinInputStyles} borderRadius={'12px'} mr={3} />
                        <PinInputField sx={pinInputStyles} borderRadius={'12px'} mr={3} />
                        <PinInputField sx={pinInputStyles} borderRadius={'12px'} mr={3} />
                        <PinInputField sx={pinInputStyles} borderRadius={'12px'} mr={3} />
                        <PinInputField sx={pinInputStyles} borderRadius={'12px'} mr={3} />
                    </PinInput>
                </Box>
                {
                    isOtpSenting && <ButtonSpinner mt={2} />
                }
                {
                    isWrongOtp && (
                        <Text mt={2} color={'red'}>Wrong Code. Send Again</Text>
                    )
                }

            </Box>


            <Flex>

                <Text fontWeight={500} color={'#6B6B6B'}>Didn’t get a code?</Text><Text ml={1} color={'black'} textDecor={'underline'} onClick={() => phoneSignIn('', (val) => setContextState('firebaseOtp', val))}> Send agin</Text>
            </Flex>
        </Box>
    )
}

export const SignupForm = () => {

    const { userData, setContextState } = useContext(AuthContext);
    const { firstName, lastName, password } = userData;
    const textGreyStyle = {
        color: '#999999',
        fontSize: '14px',
        marginTop: '7px',
        marginBottom: '20px',
        fontWeight: 500
    }
    const primaryColor = {
        borderColor: 'rgba(229, 229, 229, 1)',
        background: '#FFF',
    };

    return (
        <Box py={7}>

            <Box>
                <Flex>
                    <CustomInput
                        value={firstName}
                        onChange={(e) => {
                            console.log('e')
                            setContextState('firstName', e.target.value)
                        }}
                        placeholder='First name'
                        sx={{
                            borderTopLeftRadius: '8px',
                            borderBottomRadius: '0',
                            borderBottom: '0',
                            borderTopRightRadius: '8px'
                        }}

                    />


                </Flex>
                <CustomInput
                    value={lastName}
                    onChange={(e) => {
                        onChange('lastName', e, setContextState)
                    }}
                    placeholder='Last name'
                    type='email'
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomRadius: '8px',
                        borderBottom: '2px solid #E5E5E5',
                    }}
                />
            </Box>


            <Text sx={textGreyStyle}>Make sure it matches the name on your government ID.</Text>
            {/*  */}        <Text sx={textGreyStyle}>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Stay STG.</Text>

            <CustomInput
                value={password}
                onChange={(e) => {
                    onChange('password', e, setContextState)
                }}
                placeholder='Email'
                type='email'
                sx={{
                    borderRadius: '8px'
                }}
            />
            <Text sx={textGreyStyle}>We’ll email you trip confirmations and receipts.</Text>

            <CustomInput placeholder='Password'
                type='email'
                sx={{
                    borderRadius: '8px'
                }}>
                <InputRightElement width='4.5rem'>
                    <Text mt={2} textDecor={'underline'} >
                        {true ? 'Hide' : 'Show'}
                    </Text>
                </InputRightElement>
            </CustomInput>
            <Box my={6}>
                <Text as={'span'} sx={textGreyStyle}>
                    By selecting
                    <Text as={'span'} color={'#626262'} fontWeight={600} > Agree and continue, </Text>
                    I agree to Stay STG’s
                    <Text mr={'5px'} ml={1} as={'span'} textDecor={'underline'} color='#2A78EC' fontWeight={600} >Terms of Service, Payment
                        Terms of Service</Text>

                    and
                    <Text ml={'3px'} textDecor={'underline'} color='#2A78EC' fontWeight={600} mr={'5px'} as={'span'}> Non-discrimination Policy</Text>
                    and acknowledge the
                    <Text as={'span'}>Privacy Policy.</Text>
                </Text>
            </Box>
            <Button height={'43px'} fontSize={'14px'} color={'white'} borderRadius={'8px'} bg={'#18A7B9'} textTransform={'capitalize'} w={'100%'}>
                Agree and continue
            </Button>
        </Box>
    )
}

export const SignupFormNumber = () => {

    const { userData, setContextState } = useContext(AuthContext);
    const { firstName, lastName, password, userAuth, email, phoneNumber } = userData;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);


    const textGreyStyle = {
        color: '#999999',
        fontSize: '13px',
        marginTop: '7px',
        marginBottom: '20px',
        fontWeight: 500
    }

    return (
        <Box py={7}>
            <Box>
                <Flex>
                    <CustomInput
                        placeholder='First name'
                        value={firstName}
                        onChange={(e) => {
                            onChange('firstName', e, setContextState)
                        }}
                        sx={{
                            borderTopLeftRadius: '8px',
                            borderBottomRadius: '0',
                            borderBottom: '0',
                            borderTopRightRadius: '8px'
                        }}

                    />


                </Flex>
                <CustomInput
                    value={lastName}
                    onChange={(e) => {
                        onChange('lastName', e, setContextState)
                    }}
                    placeholder='Last name'
                    type='email'
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomRadius: '8px',
                        borderBottom: '2px solid #E5E5E5',
                    }}
                />
            </Box>
            <Text sx={textGreyStyle}>Make sure it matches the name on your government ID.</Text>
            {/*     <Input placeholder='Birthdate' />
            <Text sx={textGreyStyle}>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Stay STG.</Text> */}

            <CustomInput
                value={email}
                onChange={(e) => {
                    onChange('email', e, setContextState)
                }}
                placeholder='Email'
                type='email'
                sx={{
                    borderRadius: '8px'
                }}
            />
            <Text sx={textGreyStyle}>We’ll email you trip confirmations and receipts.</Text>
            <Box mb={3} />
            <CustomInput value={password}
                onChange={(e) => {
                    onChange('password', e, setContextState)
                }} placeholder='Password'
                type='email'
                sx={{
                    borderRadius: '8px'
                }}>
                <InputRightElement width='4.5rem'>
                    <Text mt={2} textDecor={'underline'} >
                        {true ? 'Hide' : 'Show'}
                    </Text>
                </InputRightElement>
            </CustomInput>

            <Box my={6}>
                <Text as={'span'} sx={textGreyStyle}>
                    By selecting
                    <Text as={'span'}> Agree and continue, </Text>
                    I agree to Stay STG’s
                    <Text as={'span'}>Terms of Service, Payment
                        Terms of Service</Text>

                    and
                    <Text as={'span'}> Nondiscrimination Policy</Text>
                    and acknowledge the
                    <Text as={'span'}>Privacy Policy.</Text>
                </Text>
            </Box>
            <Box id='recaptcha-container' />
            {
                isAccountCreated && (
                    <Text>Account Is created Successfully</Text>
                )
            }
            <Button onClick={async () => {

                setIsSubmitting(true);
                let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
                let credential = firebase.auth.EmailAuthProvider.credential(email, password);

                try {
                    await auth().currentUser.linkWithCredential(credential).then((res) => {
                        console.log(res)
                    })
                    await firestore().doc(`users/${userAuth.uid}`).set({
                        firstName,
                        lastName,
                        id: userAuth.uid
                    })

                    setIsSubmitting(false);

                    setIsAccountCreated(true)

                } catch (err) {
                    console.log(err)
                }
            }} disabled={isSubmitting} isLoading={isSubmitting} fontSize={'14px'} color={'white'} borderRadius={'8px'} bg={'#18A7B9'} textTransform={'capitalize'} w={'100%'}>
                Agree and continue
            </Button>
        </Box>
    )
}


const getHeaderContent = (authType, setBackAuth) => {
    if (authType === 'email' || authType === 'phoneNumber') {
        return (
            <>
                <CloseIcon w={'12px'} h={'12px'} />
                <Box w={'100%'} textAlign={'center'}>
                    <Text fontSize={'20px'} lineHeight={'30px'}>Log in or sign up</Text>

                </Box>
            </>
        )
    } else if (authType === 'emailSignUp' || authType === 'numberSignUp') {

        return (
            <>
                <ChevronLeftIcon onClick={() => setBackAuth()} w={'30px'} h={'30px'} />
                <Box w={'100%'} textAlign={'center'}>
                    <Text fontSize={'20px'} lineHeight={'30px'}>Finish signing up</Text>
                </Box>
            </>
        )
    }

    return (
        <>
            <ChevronLeftIcon onClick={() => setBackAuth()} w={'30px'} h={'30px'} />
            <Box w={'100%'} textAlign={'center'}>
                <Text fontSize={'20px'} lineHeight={'30px'}>Confirm your number</Text>

            </Box>
        </>
    )

}





export const AuthModal = ({ isOpen, setIsOpen }) => {

    const [userData, setUserData] = useState({
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        password: '',
        otp: '',
        firebaseOtp: '',
        userAuth: {}

    });

    const [authType, setAuthType] = useState({
        currentAuthType: 'email',
        lastAuthType: ''
    });

    const { currentAuthType, lastAuthType } = authType;

    const setAuth = (val) => setAuthType({
        currentAuthType: val,
        lastAuthType: currentAuthType
    });

    const setBackAuth = () => setAuthType({
        currentAuthType: lastAuthType,
        lastAuthType: currentAuthType
    });


    const handleStateChange = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const memoizedValue = useMemo(() => ({
        userData,
        setContextState: handleStateChange

    }
    ), [userData])



    return (
        <AuthContext.Provider value={memoizedValue}>

            <Modal onOverlayClick={setIsOpen} isCentered size={'xl'} isOpen={isOpen} onClose={() => { }}>
                <ModalOverlay />
                <ModalContent borderRadius={'12px'} boxShadow={'0px 0px 30px rgba(198, 217, 225, 0.8)'}>
                    <ModalHeader py={7} borderBottom={'1.5px solid rgba(0, 0, 0, 0.1)'} display={'flex'} alignItems={'center'}>

                        {getHeaderContent(currentAuthType, setBackAuth)}
                    </ModalHeader>
                    <ModalBody>
                        {

                            currentAuthType === 'email' ? <EmailForm setAuth={setAuth} /> : currentAuthType === 'phoneNumber' ? <PhoneNumberForm setAuth={setAuth} /> : currentAuthType === 'emailSignUp' ? <SignupForm /> : currentAuthType === 'otpVerification' ? <NumberPinVerify setAuth={setAuth} /> : currentAuthType === 'numberSignUp' ? <SignupFormNumber /> : ''
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </AuthContext.Provider>
    );
};



