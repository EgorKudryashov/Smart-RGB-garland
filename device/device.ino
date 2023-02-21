#include <ESP8266WiFi.h> //Использование модуля для подключения к wi-fi сети
#include <ESP8266WebServer.h> //Для создания http-сервера
#include <Adafruit_NeoPixel.h> //Управление светодиодами WS2812
#include "ArduinoJson.h"

#define PIN D1 //Пин управления гирляндой

/*Установление SSID и пароля*/
const char* ssid = "Blue Oyster";
const char* password = "c3zugqpc";

/*Создание сервера на 80 порту*/
ESP8266WebServer server(80);

/*Информация об устройстве*/
const char* device_name = "smart RGB-matrix";
const int lampsNumber = 64;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(lampsNumber, PIN, NEO_GRB + NEO_KHZ800);

void setup() {

  Serial.begin(115200);
  
  Serial.println("Connecting to ");
  Serial.println(ssid);
  //Подключение к Wi-Fi сети
  WiFi.begin(ssid, password);
   // проверить, подключился ли wi-fi модуль к wi-fi сети
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");  Serial.println(WiFi.localIP());
  delay(10);

  /* URLs для обращения к серверу */
  server.on("/connection", handle_OnConnect);
  server.on("/changeColor/", changeLampColor);
  server.on("/setBrightness/", setLampsBrightness);

  /* Запуск сервера */
  server.begin();
  Serial.println("HTTP server started");
  pinMode(LED_BUILTIN, OUTPUT); //Индикатор запуска сервера

  strip.begin();  // начинаем
  strip.show();

  defaultLamps();

}

void loop() {
  server.handleClient(); //Обработка HTTP-запросов
}

void defaultLamps (){
  strip.setBrightness(5);
  strip.show();
  for (int i=0; i<5; ++i){
    strip.setPixelColor(i, 0xFFFFFF);
  }
  delay(10);
  strip.show();
}

void handle_OnConnect(){

  DynamicJsonBuffer jsonBuffer(1000);
  JsonObject& root = jsonBuffer.parseObject(server.arg("plain"));
  Serial.println(root["lamps"][0]["r"].as<int>());
  Serial.println("New connection");
  String message = "Number of args received:";
  message += server.args();      // получить количество параметров
  message += "\n";               // переход на новую строку

  for (int i = 0; i < server.args(); i++) 
  {
    message += "Arg nº" + (String)i + " –> "; // добавить текущее значение счетчика
    message += server.argName(i) + ": ";      // получить имя параметра
    message += server.arg(i) + "\n";          // получить значение параметра
  } 
  Serial.println(message);
  server.send(200);
}

void setLampsBrightness (){
  bool isTrue = true;
  int bright;

  if (server.arg("bright")== "") 
  { // параметр не найден
    Serial.print("Ошибка в передаче запроса, нет аргумента bright");
    isTrue = false;
  }
  else
  { // параметр найден
    bright = (server.arg("bright")).toInt();
    Serial.println(bright);
    if (bright>=255) {isTrue = false;}
  }

  if (isTrue){
    strip.show();
    strip.setBrightness(bright);
    server.send(200);
    strip.show();
  }
  else {
    server.send (404, "text/plain", "Error 404");
  }
}

void changeLampColor(){
  bool change = true;

  int id;
  //uint32_t color;
  int r,g,b;
  if (server.arg("id")== "") 
  { // параметр не найден
    Serial.print("Ошибка в передаче запроса, нет аргумента id");
    change = false;
  }
  else
  { // параметр найден
    id = (server.arg("id")).toInt();
    Serial.println(id);
    if (id>=lampsNumber) {change = false;}
  }

  if (server.arg("r")== "") 
  { // параметр не найден
    Serial.print("Ошибка в передаче запроса, нет аргумента color");
    change = false;
  }
  else
  { // параметр найден
    r = server.arg("r").toInt();
    Serial.print(r);
    Serial.print(' ');
    if (r>=256) {change = false;}
  }
  if (server.arg("g")== "") 
  { // параметр не найден
    Serial.print("Ошибка в передаче запроса, нет аргумента color");
    change = false;
  }
  else
  { // параметр найден
    g = server.arg("g").toInt();
    Serial.print(g);
    Serial.print(' ');
    if (g>=256) {change = false;}
  }
  if (server.arg("b")== "") 
  { // параметр не найден
    Serial.print("Ошибка в передаче запроса, нет аргумента color");
    change = false;
  }
  else
  { // параметр найден
    b = server.arg("b").toInt();
    Serial.print(b);
    Serial.print('\n');
    if (b>=256) {change = false;}
  }

  if (change){
    strip.setPixelColor(id, r,g,b);
    strip.show();

    server.send(200);
  } 
  else 
  {
    server.send (404, "text/plain", "Error 404");
  }


}