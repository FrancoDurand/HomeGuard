var sensor_entrada = 0;
var sensor_cuarto = 1;
var sensor_entrada2 = 4;
var sensor_cuarto2 = 5;

var api = {
    type: "HomeGuard",
    states: [
        {
            name: "sensor entrada",
            type: "bool"
        },
        {
            name: "sensor cuarto",
            type: "bool",
        },
        {
            name: "sensor entrada2",
            type: "bool"
        },
        {
            name: "sensor cuarto2",
            type: "bool",
        },
        {
            name: "autorizar entrada",
            type: "bool",
            controllable: true
        },
        {
            name: "autorizar cuarto",
            type: "bool",
            controllable: true
        },
    ]
};

var estado_entrada = 0;
var estado_cuarto = 0;
var estado_entrada2 = 0;
var estado_cuarto2 = 0;
var autorizar_entrada = 0;
var autorizar_cuarto = 0;
var _estados;

var alarma = 2, bocina = 3;
var boton = 6;


function estados() {
    _estados = estado_entrada + "," + estado_cuarto +
        "," + estado_entrada2 + "," + estado_cuarto2 + "," +
        autorizar_entrada + "," + autorizar_cuarto;
}

function setup() {
    pinMode(sensor_entrada, INPUT);
    pinMode(sensor_cuarto, INPUT);
    pinMode(sensor_entrada2, INPUT);
    pinMode(sensor_cuarto2, INPUT);
    pinMode(alarma, OUTPUT);
    pinMode(bocina, OUTPUT);
    pinMode(boton, INPUT);

    digitalWrite(alarma, LOW);
    digitalWrite(bocina, LOW);

    estados();
    IoEClient.setup(api);
    IoEClient.reportStates(_estados);
    IoEClient.onStateSet = function (estado, valor) {
        autorizacion(estado, valor);
    };
}

function autorizacion(estado, valor) {
    if (estado == "autorizar entrada")
        autorizar_entrada = valor;

    if (estado == "autorizar cuarto")
        autorizar_cuarto = valor;
}

function activar_alarma() {
    if (estado_entrada == HIGH &&
        parseInt(autorizar_entrada) === 0) {
        digitalWrite(alarma, HIGH);
        digitalWrite(bocina, HIGH);
    }
    if (estado_cuarto == HIGH &&
        parseInt(autorizar_cuarto) === 0) {
        digitalWrite(alarma, HIGH);
        digitalWrite(bocina, HIGH);
    }
}

function desactivar_alarma() {
    if (digitalRead(boton) == HIGH) {
        digitalWrite(alarma, LOW);
        digitalWrite(bocina, LOW);

    }
}


function loop() {
    estado_entrada = digitalRead(sensor_entrada);
    estado_cuarto = digitalRead(sensor_cuarto);
    estado_entrada2 = digitalRead(sensor_entrada2);
    estado_cuarto2 = digitalRead(sensor_cuarto2);

    activar_alarma();
    desactivar_alarma();
    estados();
    IoEClient.reportStates(_estados);
}







