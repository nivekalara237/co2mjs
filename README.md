# co2m.js

___

##### 🚦 Build Status

![co2m.js workflow](https://github.com/nivekalara237/co2mjs/actions/workflows/cicd-pipeline.yml/badge.svg?branch=master)

![co2m.js workflow](https://github.com/nivekalara237/co2mjs/actions/workflows/release.yml/badge.svg)
___

### The Common JS Library

___


`✨Common JavaScript Utilities ✅` is a collection of reusable, well-tested, and easy-to-use utility functions designed to
simplify everyday JavaScript programming tasks. This library provides a set of commonly needed functionalities, ranging
from array manipulations and object operations to string processing and date handling. Whether you are working on a web
application, Node.js project, or any other JavaScript-based project, these utilities can help you write cleaner and more
efficient code by reducing the need to reinvent the wheel.

❇️❇️ ___Key features include:___

1. __`Array Operations`__ - Functions for sorting, filtering, flattening, and manipulating arrays.
2. __`Object Utilities`__ - Tools for deep cloning, merging, and comparing objects.
3. __`String Manipulations`__ - Handy methods for formatting, trimming, splitting, and joining strings.
4. __`Date Handling`__ - Utilities for parsing, formatting, and calculating date differences.
5. __`Type Checking`__ - Functions to determine data types, including custom type checks.
6. __`Math Utilities`__ - Methods for performing common mathematical operations like rounding, averaging, and finding
   the maximum/minimum values.
7. __`Random Generation`__ - Utilities for generating secure random numbers, strings, and IDs.
8. __`Numeric Manipulations`__ - Functions to handle numerical operations, including conversions, rounding, and
   precision handling.
9. __`Boolean Operations`__ - Tools for simplifying logical expressions and boolean evaluations
10. __`Throwable Utilities`__ - Functions to create and manage custom errors, with tools for enhanced error handling and
    debugging.
11. __`Miscellaneous`__ - Other helpful utilities such as debounce, throttle, and random ID generation.

This project is ideal for developers looking for a lightweight, dependency-free library to enhance their JavaScript
coding experience. All utilities are optimized for performance and are designed to work seamlessly across different
environments, including browsers and Node.js.

### 🚀 Installation

You can easily install the Common JavaScript Utilities library via npm. Simply run the following command in your project
directory:

```sh
npm install co2m.js
```

Alternatively, if you're using Yarn, you can install it with:

```shell
yarn add co2m.js
```

Once installed, you can start using the utility functions in your JavaScript or TypeScript projects by importing the
necessary modules:

```ts
// Importing specific utilities
import {ArrayUtils, StringUtils} from 'co2m.js';

// Using a utility function
const sortedArray = ArrayUtils.sortInt([5, 2, 9, 1]);
// ==> [1, 2, 5, 9]
const distinctArray = ArrayUtils.distinct<number>([12, 2, 12, 9]);
// ==> [12, 2, 9]
const formattedString = StringUtils.trim('   Hello World!   ');
// ==> 'Hello World!'
const padString = StringUtils.leftPad("1", "0", 3);
// ==> '0001'
```

##### License

This project is licensed under the Apache License 2.0.

You are free to use, modify, and distribute this software in accordance with the terms of the license. For more details,
please refer to the LICENSE file included in the repository.
