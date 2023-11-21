var sensor_entrada = 0;
var sensor_salida = 1;
var boton = 2;
var bocina = 3;
var alarma = 4;

var puerta1 = 5;
var puerta2 = 6;
var puerta3 = 7;
var puerta4 = 8;
var camara = 9;

function setup() {
    pinMode(sensor_entrada, INPUT);
    pinMode(sensor_salida, INPUT);
    pinMode(boton, INPUT);

    pinMode(bocina, OUTPUT);
    pinMode(alarma, OUTPUT);
    pinMode(camara, OUTPUT);

    pinMode(puerta1, OUTPUT);
    pinMode(puerta2, OUTPUT);
    pinMode(puerta3, OUTPUT);
    pinMode(puerta4, OUTPUT);
}

//Message Format: [door],[lock]
//door: 0 = closed, 1 = open, -1 = don't care
//lock: 0 = unlock, 1 = lock, -1 = don't care

function activarAlarma() {
    digitalWrite(bocina, HIGH);
    digitalWrite(alarma, HIGH);
}

function desactivarAlarma() {
    digitalWrite(bocina, LOW);
    digitalWrite(alarma, LOW);
}

function iniciarGrabacion() {
    if (digitalRead(sensor_entrada) == HIGH) {
        customWrite(camara, "1");
        Serial.println("GRABACION INICIADA ");
    }
}

function detenerGrabacion() {
    if (digitalRead(sensor_salida) == HIGH) {
        customWrite(camara, "0");
        Serial.println("GRABACION DETENIDA ");
    }
}

function bloquearPuertas() {
    if (digitalRead(sensor_entrada) == HIGH &&
        digitalRead(boton) == LOW) {
        customWrite(puerta1, "0,1");
        customWrite(puerta2, "0,1");
        customWrite(puerta3, "0,1");
        customWrite(puerta4, "0,1");

        Serial.println("ENTRADA NO AUTORIZADA PUERTAS BLOQUEDAS");
        activarAlarma();
    }
}

function desbloquearPuertas() {
    if (digitalRead(sensor_entrada) == HIGH &&
        digitalRead(boton) == HIGH) {
        customWrite(puerta1, "-1,0");
        customWrite(puerta2, "-1,0");
        customWrite(puerta3, "-1,0");
        customWrite(puerta4, "-1,0");

        Serial.println("ENTRADA AUTORIZADA PUERTAS DESBLOQUEDAS");
        desactivarAlarma();
    }
}


function loop() {
    iniciarGrabacion();
    detenerGrabacion();
    bloquearPuertas();
    desbloquearPuertas();
}