import * as SMS from "expo-sms";
import { Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";

export const sendSMS = async (phone_number, bookName, requested = false) => {
  const isAvailable = await SMS.isAvailableAsync();
  let text = `Hi, I am interested in the book you are selling?\n\n Book Name : ${bookName} \n\n \t - OleMiss BookShare`;
  if (requested) {
    text = `Hi, I have the book you have requested?\n\n Book Name : ${bookName} \n\n \t - OleMiss BookShare`;
  }
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync([phone_number], text);

    if (result === "sent") {
      Alert.alert("Message sent succesfully!");
    }
  } else {
    Alert.alert("There's no SMS available on this device");
  }
};

export const sendEmail = async (email, bookName, requested = false) => {
  const isAvailable = await MailComposer.isAvailableAsync();
  let text = "Dai ayo?";
  if(requested){
    text = "Dai ayo?";
  }

  if (isAvailable) {
    const { result } = await MailComposer.composeAsync({
      recipients: [email],
      subject: "Olemiss BookShare",
      body: text,
    });
    if (result === "sent") {
      Alert.alert("Email sent succesfully!");
    }
  } else {
    Alert.alert("There's no Mail feature accesible on this device");
  }
};
