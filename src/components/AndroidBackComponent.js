import { AndroidBackHandler } from 'react-navigation-backhandler';

class AndroidBackComponent extends React.Component {
  onBackButtonPressAndroid = () => {
    /*
    *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
    *   and react-navigation's lister will not get called, thus not popping the screen.
    *
    *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
    * */
   youWantToHandleTheBackButtonPress = true

    if (youWantToHandleTheBackButtonPress) {
      // do something
      return true;
    }
    return false;
  };

  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <BodyOfYourScreen />
      </AndroidBackHandler>
    );
  }
