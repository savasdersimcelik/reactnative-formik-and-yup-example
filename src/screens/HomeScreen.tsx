import React from "react";
import { View, Text, Button, TextInput, ActivityIndicator, Switch, ScrollView } from "react-native"
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
    email: Yup.string().label("Email").required("Please enter your e-mail address")
        .email("Please enter a valid e-mail address"),
    password: Yup.string().label("Password").required("Please enter your password")
        .min(3, 'Password must be at least 3 characters')
        .max(16, 'Password must be a maximum of 16 characters'),
    confirmPassword: Yup.string().label("Confirm Password").required("Please enter your confirm password")
    .test('passwords-match' ,'Passwords must match ya fool', function (value) {
        return this.parent.password === value
    }),
    agreeToTerms: Yup.boolean().label('Terms').test("is-true", "Must agree to terms continue", value => {
        return value === true;
    })
})

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {

    const inputStyle = {
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
    }

    if (formikProps.errors[formikKey]) {
        inputStyle.borderColor = 'red';
    }

    return (
        <View style={{ marginHorizontal: 12, marginVertical: 5 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>{label}</Text>
            <TextInput
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                value={formikProps.values[formikKey]}
                style={inputStyle}
                {...rest}
            />
            <Text style={{ color: 'red' }}>{formikProps.errors[formikKey]}</Text>
            <View style={{ height: 15 }} />
        </View>
    )
}

const StyledSwitch = ({ label, formikProps, formikKey, ...rest }) => {
    return (
        <View style={{ marginHorizontal: 12, marginVertical: 5 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5, fontSize: 14 }}>{label}</Text>
            <Switch
                onValueChange={value => {
                    formikProps.setFieldValue(formikKey, value)
                }}
                value={formikProps.values[formikKey]}
                {...rest}
            />
            <Text style={{ color: 'red' }}>{formikProps.errors[formikKey]}</Text>
            <View style={{ height: 15 }} />
        </View>
    )
}

const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View style={{ height: 15 }} />
                <Text style={{ color: 'black', marginHorizontal: 12 }}>Formik Kullanıyorum - HomeScreen</Text>
                <View style={{ height: 15 }} />
                <Formik
                    initialValues={{ email: 'a@b.com', password: '123', confirmPassword: "", agreeToTerms: false }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        setTimeout(() => {
                            //actions.setFieldError("custom", "Custom error message");
                            actions.setSubmitting(false)
                        }, 2500)
                    }}
                >
                    {(formikProps) => (
                        <View>
                            <StyledInput
                                label="Email"
                                formikKey="email"
                                formikProps={formikProps}
                            />
                            <StyledInput
                                label="Password"
                                formikKey="password"
                                formikProps={formikProps}
                                secureTextEntry
                            />
                            <StyledInput
                                label="Confirm Password"
                                formikKey="confirmPassword"
                                formikProps={formikProps}
                                secureTextEntry
                            />
                            <StyledSwitch
                                label="Agree to Terms"
                                formikKey="agreeToTerms"
                                formikProps={formikProps}
                            />
                            <View style={{ height: 15 }} />
                            {
                                formikProps.isSubmitting ? <ActivityIndicator /> : <View style={{ marginHorizontal: 12 }}><Button onPress={formikProps.handleSubmit} title="Submit" /></View>
                            }
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;