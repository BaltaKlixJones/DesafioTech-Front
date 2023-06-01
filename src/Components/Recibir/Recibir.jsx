import React, { useState } from 'react';
import { BsBluetooth } from 'react-icons/bs';
import Swal from 'sweetalert2';
import './Recibir.css';

const Recibir = () => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
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

  const handleReceiveFile = () => {
    if (connectedDevice) {
      connectedDevice.gatt
        .connect()
        .then((server) => server.getPrimaryService(UUID))
        .then((service) => service.getCharacteristic(UUID))
        .then((characteristic) => characteristic.readValue())
        .then((value) => {
          const receivedData = new Uint8Array(value.buffer);
          const receivedBlob = new Blob([receivedData]);
          setReceivedFile(receivedBlob);
          console.log("Archivo recibido con éxito");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Archivo recibido con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
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
          Recibe archivos por <BsBluetooth style={{ color: "blue", marginBottom: "-5px" }} /> Bluetooth
        </h1>
      </div>
      <div className="button-container">
        <button onClick={handleBluetoothRequest}>
          Conectar dispositivo Bluetooth
        </button>
        <br />
        <button onClick={handleReceiveFile} disabled={!connectedDevice}>
          Recibir archivo
        </button>
        <br />
        <button onClick={handleDisconnect} disabled={!connectedDevice}>
          Desconectar dispositivo Bluetooth
        </button>
        <br />
      </div>
      {connectedDevice && (
        <div>
          Dispositivo conectado: {connectedDevice.name}
        </div>
      )}
      {receivedFile && (
        <div>
          Archivo recibido: {receivedFile.name}
        </div>
      )}
    </div>
  );
};

export default Recibir;
