import notifee from '@notifee/react-native';

const displayNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'primary',
      name: 'Primary Channel',
    });
  
    await notifee.displayNotification({
      title: '<b>Title lorem ipsum</b',
      body: 'Qui officia commodo occaecat est incididunt sit incididunt.',
      android: {
        channelId,
      },
    });
  };
  export default displayNotification;
  