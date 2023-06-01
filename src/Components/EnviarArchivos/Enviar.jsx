import React from 'react'
import {BsBluetooth} from "react-icons/bs";
import { useState } from "react";
import Swal from "sweetalert2";
import "./Enviar.css"

const Enviar = () => {
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [fileToSend, setFileToSend] = useState(null);
    const UUID = "427ac5ac-008b-11ee-be56-0242ac120002";
  
    const handleBluetoothRequest = () => {
        navigator.bluetooth
          .requestDevice({ acceptAllDevices: true, optionalServices: [UUID] })
          .then((device) => {
            setConnectedDevice(device);
            console.log("Dispositivo conectado:", device);
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
              .then((service) => service.getCharacteristic(UUID))
              .then((characteristic) => characteristic.writeValue(fileData))
              .then(() => {
                console.log("Archivo enviado con éxito");
              })
              .catch((error) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Tu dispositivo no es compatible",
                    showConfirmButton: false,
                    timer: 1500,
                })
                console.error("Error al enviar el archivo:", error);
              });
          };
          reader.readAsArrayBuffer(fileToSend);
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
          <button onClick={handleBluetoothRequest}>
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