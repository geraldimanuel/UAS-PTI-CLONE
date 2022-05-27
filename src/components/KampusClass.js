import React from "react";
import { useState, useEffect } from 'react';
import { Progress, Button, ButtonGroup} from "@chakra-ui/react";
import './GamePage.css';

function GamePage() {
    // DECLARE BUTTONTYPE
    let buttonType = "";

    // UNTUK CEK TOMBOL APA YANG SEDANG DITEKAN
    var isClickedTidur = true
    var isClickedMakan = true
    var isClickedMain = true
    var isClickedBelajar = true
    var isClickedSosial = true

    // DECLARE UNTUK NAIK TURUN STATS
    const [statusMakan, setstatusMakan] = useState(0);
    const [statusMain, setstatusMain] = useState(0);
    const [statusTuru, setstatusTuru] = useState(0);
    const [statusSosial, setstatusSosial] = useState(0);
    const [statusBelajar, setstatusBelajar] = useState(0);

    function kegiatanKampus(){
        var x = document.getElementById("tombolSleep, tombolMain, tombolDiscord");
        if (x.style.display === "none"){
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    // tiap 1 detik, akan ada perubahan nilai status sebagai berikut
    useEffect(() => {

        const interval = setInterval(() => {
            if (buttonType === ""){
                    setstatusMakan((prevCounter) => prevCounter + 0.4);
                    setstatusTuru((prevCounter) => prevCounter + 0.2);
                    setstatusMain((prevCounter) => prevCounter + 0.2);
                    setstatusSosial((prevCounter) => prevCounter + 0.10);
            return () => clearInterval(interval);
            } else if (buttonType === "tidur"){
                    setstatusMakan((prevCounter) => prevCounter + 0.4);
                    setstatusTuru((prevCounter) => prevCounter - 0.5); //ini naik
                    setstatusMain((prevCounter) => prevCounter + 0.2);
                    setstatusSosial((prevCounter) => prevCounter + 0.10);
            return () => clearInterval(interval);
            } else if (buttonType === "makan"){
                    setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
                    setstatusTuru((prevCounter) => prevCounter + 0.2);
                    setstatusMain((prevCounter) => prevCounter + 0.2);
                    setstatusSosial((prevCounter) => prevCounter + 0.10);
            return () => clearInterval(interval);
            } else if (buttonType === "sosial"){
                    setstatusMakan((prevCounter) => prevCounter + 0.4);
                    setstatusTuru((prevCounter) => prevCounter + 0.2);
                    setstatusMain((prevCounter) => prevCounter + 0.2);
                    setstatusSosial((prevCounter) => prevCounter - 0.3); //ini naik
            return () => clearInterval(interval);
            } else if (buttonType === "belajar"){
                    setstatusMakan((prevCounter) => prevCounter + 0.4);
                    setstatusTuru((prevCounter) => prevCounter + 0.2);
                    setstatusMain((prevCounter) => prevCounter + 0.2);
                    setstatusSosial((prevCounter) => prevCounter + 0.10);
                    setstatusBelajar((prevCounter) => prevCounter + 0.5); //ini naik
            return () => clearInterval(interval);}
            else if (buttonType === "main"){
                setstatusMakan((prevCounter) => prevCounter + 0.3); 
                setstatusTuru((prevCounter) => prevCounter + 0.2); //ini naik
                setstatusMain((prevCounter) => prevCounter - 0.4);
                setstatusSosial((prevCounter) => prevCounter - 0.15); // ini naik
        return () => clearInterval(interval);}
        },1000);
    }, []);

    // UNTUK CEK TOMBOL APA YANG SEDANG DITEKAN , kalo gapake window.onload error gatau napa
  window.onload = function (){
    document.getElementById('tombolSleep').onclick = function() {
        isClickedMakan = true
        isClickedMain = true
        isClickedBelajar = true
        isClickedSosial = true

        if(isClickedTidur){
            buttonType="tidur";
        } 
        else{
            buttonType="";
        }
        isClickedTidur = !isClickedTidur;
    }

    document.getElementById('tombolEat').onclick = function() {
        isClickedTidur = true
        isClickedMain = true
        isClickedBelajar = true
        isClickedSosial = true

        if(isClickedMakan){
            buttonType="makan";
        } 
        else{
            buttonType="";
        }
        isClickedMakan = !isClickedMakan;
    }

    document.getElementById('tombolDiscord').onclick = function() {
        isClickedTidur = true
        isClickedMain = true
        isClickedBelajar = true
        isClickedMakan = true

        if(isClickedSosial){
            buttonType="sosial";
        } 
        else{
            buttonType="";
        }
        isClickedSosial = !isClickedSosial;
    }

    document.getElementById('tombolBelajar').onclick = function() {
        isClickedTidur = true
        isClickedMain = true
        isClickedSosial = true
        isClickedMakan = true

        if(isClickedBelajar){
            buttonType="belajar";
        } 
        else{
            buttonType="";
        }
        isClickedBelajar = !isClickedBelajar;
    }

    document.getElementById('tombolMain').onclick = function() {
        isClickedTidur = true
        isClickedBelajar = true
        isClickedSosial = true
        isClickedMakan = true

        if(isClickedSosial){
            buttonType="main";
        } 
        else{
            buttonType="";
        }
        isClickedMain = !isClickedMain;
    }
  };
  

    return (
            <div className="bungkus">
                <div className="header">
                    <h1>7 Days Student</h1>
                </div>
                <div className="body">
                    <div className="progress-bar">
                        <div className="social-bar">
                            <Progress value={statusBelajar} height='30px' marginBottom={4} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="left-right-bar">
                            <div className="left-bar">
                                <Progress value={50-statusMakan} height='20px' marginBottom={2} />
                                <Progress value={50-statusMain} height='20px' marginBottom={2} /> 
                            </div>
                            <div className="right-bar">
                                <Progress value={50-statusTuru} height='20px' marginBottom={2} />
                                <Progress value={50-statusSosial} height='20px' />
                            </div>
                        </div>
                    </div>
                    <div className="activity-button-group">
                        <ButtonGroup spacing='6'>
                            <Button>Home</Button>
                            <Button onClick={kegiatanKampus}>Kampus</Button>
                            <Button>Cafe</Button>
                            <Button>Supermarket</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
    );
}

export default GamePage;