const StackOptions = ({navigation}) => {
  console.log(navigation);
  let {state, goBack} = navigation;

  // 用来判断是否隐藏或显示header
  const visible = state.params.isVisible;
  let header;
  if (visible === true) {
    header = null;
  }
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const headerTitle = state.params.title;
  const headerTitleStyle = {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  };
  const headerBackTitle = false;
  const headerLeft = (
    <Button
      isCustom={true}
      customView={
        <Icon
          name="ios-arrow-back"
          size={30}
          color="white"
          style={{marginLeft: 13}}
        />
      }
      onPress={() => {
        goBack();
      }}
    />
  );
  return {
    headerStyle,
    headerTitle,
    headerTitleStyle,
    headerBackTitle,
    headerLeft,
    header,
  };
};

export default StackOptions;
