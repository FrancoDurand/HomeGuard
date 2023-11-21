var sensor_entrada = 0;
var sensor_salida = 1;
var camara = 2;

function setup() {
    pinMode(sensor_entrada, INPUT);
    pinMode(sensor_salida, INPUT);
    pinMode(camara, OUTPUT);
}

//customWrite(camara, [0]); apagar 
//customWrite(camara, [1]); encender 

function loop() {
    if (digitalRead(sensor_entrada) == HIGH) {
        customWrite(camara, "1");
        Serial.println("Grabacion iniciada");
    }

    if (digitalRead(sensor_salida) == HIGH) {
        customWrite(camara, "0");
        Serial.println("Grabacion terminada");
    }
}

var sensor_entrada = 0;
var boton = 1;
var puerta1 = 2;
var puerta2 = 3;
var puerta3 = 4;
var puerta4 = 5;

function setup() {
    pinMode(sensor_entrada, INPUT);
    pinMode(boton, INPUT);

    pinMode(puerta1, OUTPUT);
    pinMode(puerta2, OUTPUT);
    pinMode(puerta3, OUTPUT);
    pinMode(puerta4, OUTPUT);
}

//Message Format: [door],[lock]
//door: 0 = closed, 1 = open, -1 = don't care
//lock: 0 = unlock, 1 = lock, -1 = don't care

function loop() {
    if (digitalRead(sensor_entrada) == HIGH &&
        digitalRead(boton) == HIGH) {

        customWrite(puerta1, "-1,0");
        customWrite(puerta2, "-1,0");
        customWrite(puerta3, "-1,0");
        customWrite(puerta4, "-1,0");

        Serial.println("Entrada autorizada");
        Serial.println("Puertas desbloquedas");
    }

    if (digitalRead(sensor_entrada) == HIGH &&
        digitalRead(boton) == LOW) {

        customWrite(puerta1, "-1,1");
        customWrite(puerta2, "-1,1");
        customWrite(puerta3, "-1,1");
        customWrite(puerta4, "-1,1");

        Serial.println("Entrada no autorizada");
        Serial.println("Puertas bloquedas");
    }
}