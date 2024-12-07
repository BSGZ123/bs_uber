import Taro from '@tarojs/taro';
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { View, Input, Map, ScrollView } from '@tarojs/components';
import QQMapWX from '../../assets/qqmap-wx-jssdk.min.js';
import imgUrl from '../../assets/location.png';
import gStyle from '../../constants/globalStyles'
import './index.scss';

const Index = () => {
  const [latitude, setLatitude] = useState(35.95234);
  const [longitude, setLongitude] = useState(120.239013);
  const [markers, setMarkers] = useState([
    {
      iconPath: imgUrl,
      id: 0,
      latitude: 35.95234,
      longitude: 120.239013,
      width: 16,
      height: 16,
    },
  ]);
  const [qMapKey] = useState('HPJBZ-I6AKJ-XM3F5-DZCGN-5RKUV-S6BLZ');
  const [QQMapSDK, setQQMapSDK] = useState(null);
  const [nearbyBuilding, setNearbyBuilding] = useState([]);
  const [searchVal, setSearchVal] = useState('House');


  useEffect(() => {
    const sdk = new QQMapWX({
      key: 'HPJBZ-I6AKJ-XM3F5-DZCGN-5RKUV-S6BLZ',
      mapStyleId: 'style1',
    });
    setQQMapSDK(sdk);

    Taro.getLocation({
      type: 'wgs84',
      success: (res) => {
        const newMarkers = [{...markers[0], latitude: res.latitude, longitude: res.longitude}];
        setMarkers(newMarkers);
        setLatitude(res.latitude);
        setLongitude(res.longitude);

        searchNearby(sdk, searchVal, res.latitude, res.longitude);
      },
    }).then(r =>{});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (QQMapSDK) {
      searchNearby(QQMapSDK, searchVal, latitude, longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal, QQMapSDK]);

  const searchNearby = (sdk, keyword, latitude, longitude) => {
    sdk.search({
      keyword,
      boundary: `nearBy(${latitude},${longitude},1000)`,
      success: (searchRes) => {
        setNearbyBuilding(searchRes.data);
      },
      fail: (searchRes) => {
        console.error('Search failed:', searchRes);
      },
    });
  };


  const handleSearchValChange = (e) => {
    setSearchVal(e.detail.value);
  };

  const handleNearbyClick = (latitude, longitude) => {
    const newMarkers = [{ ...markers[0], latitude, longitude }];
    setMarkers(newMarkers);
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleMarkerClick = (e) => {
    console.log('Marker clicked:', e);
  };

  const handleRegionChange = (e) => {
    console.log('Region changed:', e);
  };

  return (
    <View className='homeWrap' style={gStyle.container}>
      <View className='searchDom'>
        <Input
          value={this.state.searchVal}
          onInput={this.handleSearchValChange.bind(this)}
          className='inputDom'
        />
      </View>

      {/**
       * longitude 中心经度
       * latitude 中心纬度
       * scale 缩放级别，取值范围为5-18
       * onMarkertap marker 点击事件
       * onRegionchange 视野发生变化触发事件
       * show-location 显示带有方向的当前定位点
       * cover-view 覆盖在原生组件之上的文本视图
       */}
      <Map
        class='mapDom'
        subkey={this.state.qMapKey}
        longitude={this.state.longitude}
        latitude={this.state.latitude}
        scale='18'
        markers={this.state.markers}
        onMarkertap={this.handleMarkerClick.bind(this)}
        onRegionchange={this.handleRegionChange.bind(this)}
        showLocation
      />

      <ScrollView className='scrollDom' scrollY scrollWithAnimation lowerThreshold='50'>
        {this.state.nearbyBuilding.map((item) => (
          <View
            key={item.id}
            className='nearbyBuilding'
            onClick={this.handleNearbyClick.bind(this, item.location.lat, item.location.lng)}
          >
            <View className='nearbyTitle'>{item.title}</View>
            <View className='nearbyAddr'>{item.address}</View>
          </View>
        ))}
      </ScrollView>

      <View className='operateDom'>

      </View>

    </View>
  );
};


export default Index;
