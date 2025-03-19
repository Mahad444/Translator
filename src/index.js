import { View, Text,StyleSheet,TextInput,TouchableOpacity,Keyboard} from 'react-native'
import React,{useState} from 'react';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const TranslateApp = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText,setTranslatedText] = useState('');
    const[fromLanguage,setFromLanguage] = useState('English'); //default language
    const[toLanguage,setToLanguage] = useState('Arabic'); //default language
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
 
    const API_KEY = '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' //API key from API provider

    const translateText = async () => { 
         
        try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions',
        {
             messages: [
                {role:'user', content : `Translatethe following ${fromLanguage} to ${toLanguage}: ${inputText}`},
                
                {role: 'assistant', content: 'Translate'}
             ],
             max_tokens: 500,
             model: 'gpt-3.5 turbo',
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            }
        }
        );

        //The translated text will be assistance's response
        setTranslatedText(response.data.choices[0].message.content);

        //Hide the keyboard after translation
        Keyboard.dismiss();

    }catch (error) {
        console.log('Error Translating Text:', error.response.data);
    }
    
    }


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mahad Translating App</Text>
      <View
       style={styles.dropdowncontainer}>
        <DropDownPicker 
        open={openTo}
        value={toLanguage}
        setOpen={setOpenTo}
        setValue={setToLanguage}
        
        items={[
            {label: 'English', value: 'English'},
            {label: 'Swahili', value: 'Swahili'},
            {label: 'French', value: 'French'},
            {label: 'Spanish', value: 'Spanish'},
            {label: 'German', value: 'German'},
            {label: 'Italian', value: 'Italian'},
            {label: 'Portuguese', value: 'Portuguese'},
            {label: 'Somali', value: 'Somali'},
            {label:'Arabic', value: 'Arabic'},
            // italiano
            {label:'Italiano', value: 'Italiano'},
            // croatia
            {label:'croatian', value: 'Croatia'},
            // somali
            {label:'Somali', value: 'Somali'},
            // malyalam
            {label:'Malyalam',value:'Malyalam'},
            // srilankan
            {label:'Srilankan',value:'Srilankan'},
            {label:"Hindi",value:"Hindi"},
            // tamil
            {label:'Tamil',value:'Tamil'},
            {label:'Urdu',value:'Urdu'},
            // farsi
            {label:'Farsi',value:'Farsi'},
            //zulu
            {label:'Zulu',value:'Zulu'},
        ]}
        defaultValue={toLanguage}
        placeholder="Select Language"
        style={styles.dropdown}
        containerStyle={{flex: 1 ,alignItems: 'center'}}

        omChangeItem={(item)  => 
            setToLanguage(item.value)}

        />
    </View>
    <TextInput 
    style={styles.input}
    onChangeText={text => setInputText(text)}
    value = {inputText}
    multiline 
    />
        <TouchableOpacity style={styles.button} 
        onPress={translateText}>
            <Text style={styles.buttontext}>Translate Above Text</Text>

        </TouchableOpacity>
<Text style={styles.title2}>Translated Text</Text>
<Text style={styles.text}>{translatedText}</Text>
    </View>
  )
}

export default TranslateApp



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: { 
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 100,
    },
    dropdowncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dropdown: {
        height: 150,
        width: '100',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        color : '#fff',
        padding:10,
        marginTop:100,
    },
    button: {
        backgroundColor: '#026efd',
        width:199,
        height: 50,
        marginTop:100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttontext: {
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold',
    },
    title2: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        marginBottom : 20,
        marginTop: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    input : {
        height: 150,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        color: '#fff',
        padding: 10,
        marginTop: 100,

        }
});