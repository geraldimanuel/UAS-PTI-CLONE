import React from "react";
import Select from "react-select";
import "./App.css";

function FormName() {
  return (
    <form>
      <div>
        <input className="input" type="text" placeholder="Enter your Name" />
      </div>
    </form>
  );
}

const jurusan = [
  { label: "===== Fakultas Teknik & Informatika =====" },
  { label: "Informatika", value: "Informatika" },
  { label: "Sistem Informasi", value: "SistemInformasi" },
  { label: "Teknik Komputer", value: "TeknikKomputer" },
  { label: "Teknik Elektro", value: "TeknikElektro" },
  { label: "Teknik Fisika", value: "TeknikFisika" },
  { label: "===== Fakultas Bisnis =====" },
  { label: "Perhotelan", value: "Hotel" },
  { label: "Akuntansi", value: "Akuntan" },
  { label: "Manajemen", value: "Manaj" },
  { label: "===== Fakultas Ilmu Komunikasi =====" },
  { label: "Komunikasi Strategis", value: "Stracom" },
  { label: "Digital Jurnalistik", value: "DiJur" },
  { label: "===== Fakultas Seni & Design =====" },
  { label: "DKV", value: "DolphiDKV" },
  { label: "Arsitektur", value: "Arsitektur" },
  { label: "Film & Animasi", value: "Filmasi" }
];

function App() {
  return (
    <div className="App">
      <FormName />
      <Select options={jurusan} />
      <input className="submit" type="submit" value="Submit" />
    </div>
  );
}

export default App;