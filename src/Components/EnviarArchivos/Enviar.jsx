import React from 'react'
import {BsBluetooth} from "react-icons/bs";
import { useState } from "react";
import Swal from "sweetalert2";
import "./Enviar.css"
import {BluetoothUUID} from "web-bluetooth";

const Enviar = () => {
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [fileToSend, setFileToSend] = useState(null);
    
    
  const UUID = "0000180a-0000-1000-8000-00805f9b34fb"
  const characteristicUUID = "00002a24-0000-1000-8000-00805f9b34fb";
  const serviceUUID = "00002a25-0000-1000-8000-00805f9b34fb"
 
  const optionalServices2 = UUID
  .split(/, ?/)
  .map((s) => (s.startsWith("0x") ? parseInt(s) : s))
  .filter((s) => s && BluetoothUUID);



  const handleBluetoothRequest = () => {
    navigator.bluetooth
    .requestDevice({ acceptAllDevices: true, optionalServices: [UUID]})
    
      .then((device) => {
        setConnectedDevice(device);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Dispositivo conectado",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Dispositivo Bluetooth conectado:", device);
        return device.gatt.connect();
      })
      .catch((error) => {
        console.error("Error al solicitar dispositivo Bluetooth:", error);
      });
  };
    
      const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFileToSend(selectedFile);
      };



    
      const handleSendFile = () => {
        if (connectedDevice && fileToSend) {
          const reader = new FileReader();
          reader.onload = () => {
            const fileData = reader.result;
            connectedDevice.gatt
              .connect()
              .then((server) => server.getPrimaryService(UUID))
              .then((service) => service.getCharacteristic(characteristicUUID))
              .then((characteristic) => characteristic.writeValue(fileData))
              .then(() => {
                console.log("Archivo enviado con éxito");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Archivo enviado con éxito",
                  showConfirmButton: false,
                  timer: 1500,
                });
              })
              .catch((error) => {
                console.error("Error al enviar el archivo:", error);
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Error al enviar el archivo",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          };
          reader.readAsArrayBuffer(fileToSend.slice(0, fileToSend.size));
        }
      };

      const handleDisconnect = () => {
        if (connectedDevice) {
          connectedDevice.gatt.disconnect();
          setConnectedDevice(null);
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
      <div className="container-enviar">
        <div>
         
         <h1>Envía archivos por <BsBluetooth style={{color:"blue", marginBottom:"-5px"}}/> Bluetooth</h1> 
        </div>
        <div className="button-container">
          <button onClick={handleBluetoothRequest} disabled={connectedDevice}>
            Conectar dispositivo Bluetooth
          </button>
          <br />
          <br />
          <button onClick={handleDisconnect} disabled={!connectedDevice}>
          Desconectar dispositivo Bluetooth
        </button>
        <br />
        <br />
        
          <input type="file" onChange={handleFileInputChange} />
          <br />
          <br />
          <button onClick={handleSendFile} disabled={!connectedDevice || !fileToSend}>
            Enviar archivo
          </button>
          <br />
        </div>
        {connectedDevice && (
          <div className='dispositivo-conectado'>
           <h4>Dispositivo conectado: {connectedDevice.name}</h4> 
          </div>
        )}
      </div>
    );
  };

export default Enviar