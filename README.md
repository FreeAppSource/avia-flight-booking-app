# Avia Flight Booking App

A mobile flight booking application built with **React Native**, **Expo SDK 58+**, and **Expo Router**, based on the Sketch UI Kit (`avia-booking-ui-kit-interface.sketch`).

## 🚀 Features & Completed Artboards

Avia includes full implementations of all **16 Sketch artboards** (8 core screens across both **Dark Mode 🌚** and **Bright Mode 🌈**):

| # | Screen | Sketch Artboard ID | Route | Description |
|---|---|---|---|---|
| 1 | **Main Search** | `8A4B3734` & `D2ACDE10` | `src/app/(tabs)/index.jsx` | Flight route map backdrop, Saint-Petersburg (`LED`) to Seoul (`ICN`), interactive departure & arrival date selectors, passenger counters, and Search trigger. |
| 2 | **Airport Suggest** | `DC77AB46` & `2123CF13` | `src/app/suggest.jsx` | Real-time airport & destination autocomplete filter (Seoul, Seville, Semey, Tacoma), origin preset, and route swap. |
| 3 | **Flight Calendar** | `BD9109B3` & `DA77E609` | `src/app/calendar.jsx` | Interactive date range picker, One-way vs Return switcher, October 2018 / current month grid with selection highlights. |
| 4 | **Flight Options & City Guide** | `F939FA9E` & `D7A0FC6F` | `src/app/(tabs)/flights.jsx` | Seoul hero visual, temperature (`+9°C SUNNY`), local time (`21:48 GMT+9`), Miracle on the Han River story, currency badge, and flight cards (`Jet Airways`, `$1,250`). |
| 5 | **Cabin Seat Selection** | `377E071E` & `346F5600` | `src/app/seats.jsx` | Airplane cabin fuselage, Business Class vs Economy Class, columns A through F with aisle, seat status legend (Free, Reserved, Selected `15A`), and bottom summary card. |
| 6 | **Boarding Pass & Attractions** | `B85C6405` & `EAC75D15` | `src/app/(tabs)/ticket.jsx` | 1186px detailed boarding pass card, barcode, flight code `#4739374hfjdj`, and destination attractions carousel ("National Museum of Korea", Must See). |
| 7 | **Confirmation & Payment** | `7126D2F2` & `8528EFFE` | `src/app/confirmation.jsx` | Route review, seat `15A`, Apple Pay & Credit Card payment methods, price breakdown, and booking confirmation alert. |
| 8 | **Settings & Theming** | `927EC9CB` & `E8A26AE4` | `src/app/settings.jsx` | Theme toggle (**Dark Mode 🌚** Deep Midnight Navy vs **Bright Mode 🌈** Vibrant Cobalt Blue), sort filters, passenger counters, and meal preferences. |

## 🛠️ Tech Stack

- **Framework**: React Native 0.88+ / Expo SDK 58+
- **Navigation**: Expo Router (File-based routing with Tabs & Stacks)
- **Language**: JavaScript & JSX (`.js`, `.jsx` strictly)
- **Icons**: `@expo/vector-icons` (Ionicons)

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Avia Booking Concept** design by **Aleksey Bondarev**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Aleksey Bondarev](https://www.sketchappsources.com/contributor/drunkdesigner) |
| Original design | [Avia Booking Concept](https://dribbble.com/shots/7817865-Choosing-and-buying-plane-tickets) |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4574-avia-booking-ui-kit-sketch-freebie-resource.html) |
| Dribbble | <http://www.dribbble.com/interface> |
| Website | <https://www.instagram.com/myinterface/> |
| Original file | `avia-booking-ui-kit-interface.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Avia Booking Concept" by Aleksey Bondarev (https://dribbble.com/shots/7817865-Choosing-and-buying-plane-tickets), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4574-avia-booking-ui-kit-sketch-freebie-resource.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's.

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
