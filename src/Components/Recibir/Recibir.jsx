import React, { useState } from 'react';
import { BsBluetooth } from 'react-icons/bs';
import Swal from 'sweetalert2';
import './Recibir.css';

const Recibir = () => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [showBatteryLevel, setShowBatteryLevel] = useState(false);


  const UUID = "427ac5ac-008b-11ee-be56-0242ac120002";

  // const handleBluetoothRequest = () => {
  //   navigator.bluetooth
  //     .requestDevice({ acceptAllDevices: true, optionalServices: [UUID] })
  //     .then((device) => {
  //       setConnectedDevice(device);
  //       console.log("Dispositivo conectado:", device);
  //     })
  //     .catch((error) => {
  //       console.error("Error al solicitar dispositivo Bluetooth:", error);
        
  //     });
  // };
  // const handleBluetoothRequest = () => {
  //   navigator.bluetooth
  //     .requestDevice({ acceptAllDevices: true, optionalServices: [UUID] })
  //     .then((device) => {
  //       setConnectedDevice(device);
  //       console.log("Dispositivo conectado:", device);
  //       return device.gatt.connect();
  //     })
  //     .then((server) => server.getPrimaryService(UUID))
  //     .then((service) => service.getCharacteristic("battery_service"))
  //     .then((characteristic) => characteristic.readValue())
  //     .then((value) => {
  //       const batteryLevel = value.getUint8(0);
  //       setBatteryLevel(batteryLevel);
  //       console.log("Nivel de batería:", batteryLevel);
  //     })
  //     .catch((error) => {
  //       console.error("Error al solicitar dispositivo Bluetooth:", error);
  //     });
  // };

  const handleBluetoothRequest = () => {
    navigator.bluetooth
      .requestDevice({ acceptAllDevices: true, optionalServices: ['battery_service'] })
      .then((device) => {
        setConnectedDevice(device);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Dispositivo conectado",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Dispositivo conectado:", device);
        return device.gatt.connect();
      })
      .then((server) => server.getPrimaryService('battery_service'))
      .then((service) => service.getCharacteristic('battery_level'))
      .then((characteristic) => characteristic.readValue())
      .then((value) => {
        const batteryLevel = value.getUint8(0);
        setBatteryLevel(batteryLevel);
        console.log("Nivel de batería:", batteryLevel);
      })
      .catch((error) => {
        console.error("Error al solicitar dispositivo Bluetooth:", error);
      });
  };


  const handleReceiveFile = () => {
    if (connectedDevice) {
      connectedDevice.gatt
        .connect()
        .then((server) => server.getPrimaryService('battery_service'))
        .then((service) => service.getCharacteristic('battery_level'))
        .then((characteristic) => characteristic.readValue())
        .then((value) => {
          const receivedData = new Uint8Array(value.buffer);
          const receivedBlob = new Blob([receivedData]);
          setReceivedFile(receivedBlob);
          console.log("Archivo recibido con éxito");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Detalles recibidos con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowBatteryLevel(true); // Mostrar nivel de batería después de recibir el archivo
        })
        .catch((error) => {
          console.error("Error al recibir el archivo:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al recibir el archivo",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const handleDisconnect = () => {
    if (connectedDevice) {
      connectedDevice.gatt.disconnect();
      setConnectedDevice(null);
      setReceivedFile(null);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Dispositivo desconectado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container-recibir">
      <div>
        <h1>
          Recibe datos por <BsBluetooth style={{ color: "blue", marginBottom: "-5px" }} /> Bluetooth
        </h1>
      </div>
      <div className="button-container">
        <button onClick={handleBluetoothRequest}>
          Conectar dispositivo Bluetooth
        </button>
        <br />
        <button onClick={handleReceiveFile} disabled={!connectedDevice}>
          Recibir detalles
        </button>
        <br />
        <button onClick={handleDisconnect} disabled={!connectedDevice}>
          Desconectar dispositivo Bluetooth
        </button>
        <br />
      </div>
     
      {receivedFile && connectedDevice && showBatteryLevel && batteryLevel !== null && (
      <div className="detalles-container">
        <div className="detalles">
          <h4>Dispositivo conectado: {connectedDevice.name}</h4>
          <br />
          <h4>Detalle recibido: {receivedFile.name}</h4>
        </div>
        <div className="nivel-bateria">
          Nivel de batería <span className="bateria-icon">🔋</span>: {batteryLevel}%
        </div>
      </div>
    )}
    </div>
  );
};

export default Recibir;
