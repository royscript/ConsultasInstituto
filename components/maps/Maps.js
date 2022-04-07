import {NavigationApps,actions,googleMapsTravelModes, search, lat, lon, action,mapsTravelModes} from "react-native-navigation-apps";
export default Maps = ({route})=>{
    const datos = route.params;
    return <NavigationApps
                iconSize={50}
                row
                address={`${datos.direccion}, ${datos.comuna}`} // address to navigate by for all apps 
                waze={{address:'',lat:'',lon:'',action: actions.navigateByAddress}} // specific settings for waze
                googleMaps={{search,lat:'',lon:'',action: actions.navigateByAddress,travelMode:googleMapsTravelModes.driving}} // specific settings for google maps
                maps={{search,lat:'',lon:'',action: actions.navigateByAddress,travelMode:mapsTravelModes.driving}} // specific settings for maps
            />;
}