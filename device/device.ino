#include <Adafruit_NeoPixel.h>
#define PIN D1
Adafruit_NeoPixel strip = Adafruit_NeoPixel(24, PIN, NEO_GRB + NEO_KHZ800);

void setup() {

  pinMode(LED_BUILTIN, OUTPUT);

  strip.begin();              // начинаем
  strip.setBrightness(50);    // делаем яркость 50 (максимум 254)
  strip.show();               // ощищаем экран (рекомендуется при запуске для отключения случайных пикселей
  strip.setPixelColor(0, 0xFF0000);   // красный
  strip.setPixelColor(1, 0x00FF00);   // зеленый
  strip.setPixelColor(2, 0x0000FF);   // синий
  strip.setPixelColor(3, 0xFF0000);   // красный
  strip.setPixelColor(4, 0x00FF00);   // зеленый
  strip.setPixelColor(5, 0x0000FF); 
  strip.setPixelColor(6, 0xFF0000);   // красный
  strip.setPixelColor(7, 0x00FF00);   // зеленый
  strip.setPixelColor(8, 0x0000FF); 
  strip.setPixelColor(9, 0xFF0000);   // красный
  strip.setPixelColor(10, 0x00FF00);   // зеленый
  strip.setPixelColor(11, 0x0000FF); 
  strip.show();               // выводим

}

void loop() {
}