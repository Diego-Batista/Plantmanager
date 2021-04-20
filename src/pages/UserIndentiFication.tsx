import React, {useState} from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {Button} from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIndentiFication(){
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isField, setIsField] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur(){
      setIsFocused(false);
      setIsField(!!name);
    }

    function handleInputFocus(){
      setIsFocused(true);
    }

    function handleInputChange(value: string){
      setIsField(!!value);
      setName(value);
    }

    

    function handleSubmit() {
        navigation.navigate('Confirmation');
    }


    return (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={styles.container}>
              <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.content}>
                    <View style={styles.form}>
                      <View style={styles.header}>
                        <Text style={styles.emjoi}>
                            {isField ? '😄' : '😃'}
                        </Text>
                        <Text style={styles.title}>
                          Como podemos {'\n'} chamar você?
                        </Text>
                      </View>
                      <TextInput 
                        style={[
                          styles.input,
                          (isFocused || isField) && {borderColor: colors.green}
                        ]}  
                        placeholder="Digite um nome"   
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus} 
                        onChangeText={handleInputChange}         
                      />
                      <View style={styles.footer}>
                        { isField ? (
                          <Button 
                          title="Confirmar"
                          onPress={handleSubmit}
                          />
                        ) : (
                          <Button
                            disabled={true}
                            title="Confirmar"
                            onPress={handleSubmit}
                            style={styles.buttonDisabled}
                          />
                        )
                      
                      }
                        
                      </View>
                    </View>
                  </View>  
                </TouchableWithoutFeedback>      
              </KeyboardAvoidingView>    
          </SafeAreaView>
        </>

    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    content: {
      flex: 1,
      width: '100%',
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 54,
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
    },
    emjoi: {
      fontSize: 44,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      color: colors.heading,
      width: '100%',
      fontSize: 18,
      marginTop: 50,
      padding: 10,
      textAlign: 'center',
    },
    title: {
      fontSize: 24,
      lineHeight: 32,
      textAlign: 'center',
      color: colors.heading,
      fontFamily: fonts.heading,
      marginTop: 20,
    },
    footer: {
      width: '100%',
      marginTop: 40,
      paddingHorizontal: 20,
    },
    buttonDisabled: {
      backgroundColor: colors.body_dark,
      height: 56,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    }
});