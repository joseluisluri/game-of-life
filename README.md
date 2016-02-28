# [game-of-life](https://github.com/joseluisluri/game-of-life/)
Conway's Game of Life - Javascript/Canvas Implementation

**Live Demo:** [https://joseluisluri.github.io/game-of-life](https://joseluisluri.github.io/javascript-gol)

## Table of Contents

- [Introduction](#introduction)
- [Screenshots](#screenshots)
- [Browser Support](#browser-support)
- [TODO](#todo)
- [License](#license)

## Introduction

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

The universe of the Game of Life is an two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

    - Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    - Any live cell with more than three live neighbours dies, as if by overcrowding.
    - Any live cell with two or three live neighbours lives on to the next generation.
    - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Try our patterns or make your own!

Enjoy! :3
José Luis Luri

## Screenshots

![Screenshot](http://joseluisluri.github.io/game-of-life/ss/gol.png)

## Browser Support

<table>
  <tbody>
    <tr>
      <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Internet_Explorer_9_icon.svg/2000px-Internet_Explorer_9_icon.svg.png" height="40"></td>
      <td><img src="http://www.favbrowser.com/wp-content/uploads/2015/04/edge.gif" height="40"></td>
      <td><img src="http://img3.wikia.nocookie.net/__cb20120330024137/logopedia/images/d/d7/Google_Chrome_logo_2011.svg" height="40"></td>
      <td><img src="http://media.idownloadblog.com/wp-content/uploads/2014/06/Safari-logo-OS-X-Yosemite.png" height="40"></td>
      <td><img src="http://th09.deviantart.net/fs71/200H/f/2013/185/e/b/firefox_2013_vector_icon_by_thegoldenbox-d6bxsye.png" height="40"></td>
      <td><img src="http://upload.wikimedia.org/wikipedia/commons/d/d4/Opera_browser_logo_2013.png" height="40"></td>
    </tr>
    <tr>
      <td align="center">X</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">X</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
  </tbody>
</table>

## TODO

- [ ] Mobile Support
- [ ] IE/Safari Support
- [ ] More Patterns :)

## License

**Bootstrap:** [MIT](https://github.com/twbs/bootstrap/blob/master/LICENSE)
**jQuery:** [MIT](https://jquery.org/license/)
**jQuery UI:** [MIT](https://jquery.org/license/o)

Copyright (c) 2015 José Luis Luri. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of
    conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list
    of conditions and the following disclaimer in the documentation and/or other materials
    provided with the distribution.

THIS SOFTWARE IS PROVIDED BY JOSÉ LUIS LURI ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of José Luis Luri.
