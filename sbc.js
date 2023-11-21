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