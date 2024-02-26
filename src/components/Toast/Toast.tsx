import Toast from 'react-native-toast-message';
import {Button} from 'react-native';

export function Toasting(props: any) {
  const showToast = () => {
    Toast.show({
      type: 'Error',
      text1: 'Incorrect login credentials. Please try again',
    });
  };

  return <Button title="Show toast" onPress={showToast} />;
}
