#include <ESP8266WiFi.h> //Использование модуля для подключения к wi-fi сети
#include <ESP8266WebServer.h> //Для создания http-сервера
#include <Adafruit_NeoPixel.h> //Управление светодиодами WS2812
#include <ArduinoJson.h> //Работа с JSON. Version 5.13.5

#define PIN D1 //Пин управления гирляндой

/*Установление SSID и пароля*/
const char* ssid = "Blue Oyster";
const char* password = "c3zugqpc";

/*Создание сервера на 80 порту*/
ESP8266WebServer server(80);

/*Информация об устройстве*/
const char* device_name = "smart RGB-matrix";
const int lampsNumber = 64;

struct Lamp {
  int id;
  int r;
  int g;
  int b;
};

Lamp garland[lampsNumber];
int garlandBright = 10;

int garlandMode = -1;
int totalModes = 4;

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
  server.on("/connection", onConnection);
  server.on("/refreshGarland", refreshAllLamps);
  server.on("/changeColor/", changeLampColor);
  server.on("/setBrightness/", setLampsBrightness);
  server.on("/chooseMode/", chooseMode);

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

  if (garlandMode == 0){
    loadColorsOnGarland();
  }

  // garlandMode == 1 - RandomColors
  if (garlandMode == 2){
    GarlandBlink(500);
  }
  if (garlandMode == 3){
    GarlandFade(200);
  }

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

void loadColorsOnGarland (){
  for (int i=0; i<lampsNumber; ++i){
    strip.setPixelColor(i, garland[i].r, garland[i].g, garland[i].b);    
  }
  strip.setBrightness(garlandBright);
  strip.show();

  garlandMode = -1;
}

void onConnection(){
  /*Собираем строку в формате JSON*/
  String res = "{\"name\":";
  res += device_name;
  res+= ",\"lampsNumber\":";
  res+= lampsNumber;
  res+='}';
  //Serial.println(res);
  server.send(200, "application/json",res);
}

void refreshAllLamps(){

  DynamicJsonBuffer jsonBuffer(1000);
  JsonObject& root = jsonBuffer.parseObject(server.arg("plain"));
  Serial.println("New connection");
/*  String message = "Number of args received:";
  message += server.args();      // получить количество параметров
  message += "\n";               // переход на новую строку

  for (int i = 0; i < server.args(); i++) 
  {
    message += "Arg nº" + (String)i + " –> "; // добавить текущее значение счетчика
    message += server.argName(i) + ": ";      // получить имя параметра
    message += server.arg(i) + "\n";          // получить значение параметра
  } 
  Serial.println(message);
  */
  for (int i=0; i<lampsNumber; ++i){
    garland[i].r = root["lamps"][i]["r"];
    garland[i].g = root["lamps"][i]["g"];
    garland[i].b = root["lamps"][i]["b"];
  }

  loadColorsOnGarland();

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
    strip.setBrightness(bright);
    strip.show();
    garlandBright = bright;

    server.send(200);
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
    garland[id].r = r;
    garland[id].g = g;
    garland[id].b = b;
    strip.show();

    server.send(200);
  } 
  else 
  {
    server.send (404, "text/plain", "Error 404");
  }


}

void chooseMode (){
  bool isTrue = true;
  int mode;

  if (server.arg("mode")== "") 
  { // параметр не найден
    Serial.print("Ошибка в передаче запроса, нет аргумента mode");
    isTrue = false;
  }
  else
  { // параметр найден
    mode = (server.arg("mode")).toInt();
    Serial.println(mode);
    if (mode>=totalModes) {isTrue = false;}
  }
  server.send(200);

  if (mode == 0){
    garlandMode = 0;
  }

  if (mode == 1) {
    RandomColors();
  }
  if (mode == 2) {
    garlandMode = 2;
  }
  if (mode == 3) {
    garlandMode = 3;
  }
}

void RandomColors (){
  for (int i=0; i<lampsNumber; ++i){
    strip.setPixelColor(i, random(0,255), random(0,255), random(0,255));
  }
  strip.show();
}

void GarlandBlink(int wait){
  for (int i = 0; i < lampsNumber; ++i){
    strip.setPixelColor(i, 0, 0, 0);
  }
  strip.show();
  delay(wait);
  for (int i = 0; i < lampsNumber; ++i)
  {
    strip.setPixelColor(i, garland[i].r, garland[i].g, garland[i].b);
  }
  strip.show();
  delay(wait);
}

void GarlandFade(int FadeSpeed)
{
  for (int i = 180; i > 5; i-=10)
  {
    strip.setBrightness(i);
    strip.show();
    delay(FadeSpeed);
  }
  for (int i = 5; i < 180; i+=10)
  {
    strip.setBrightness(i);
    strip.show();
    delay(FadeSpeed);
  }
}