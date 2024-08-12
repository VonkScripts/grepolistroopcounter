// ==UserScript==
// @name         Troopcounter
// @namespace    http://tampermonkey.net/
// @version      2024-04-01
// @description  Simple custom made troopcounter
// @author       Vonk
// @match        https://*.grepolis.com/game/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/488282/Troopcounter.user.js
// @updateURL https://update.greasyfork.org/scripts/488282/Troopcounter.meta.js
// ==/UserScript==

(function () {
    'use strict';

    $(document).ready(function () {
        addTroopCounterButton();
        setTimeout(function () {
            if (localStorage.getItem(storagetoken) !== null && localStorage.getItem(storagekey) !== null) {
                fetchData();
                setInterval(fetchData, 600000);
            }
        }, 10000);

        const worldId = Game.world_id;

        const storagetoken = `token_${worldId}`;
        const storagekey = `key_${worldId}`;


        function addTroopCounterButton() {
            if (document.getElementById('troopCounterButton') == null) {
                var a = document.createElement('div');
                a.id = "troopCounterButton";
                a.className = 'btn_settings circle_button_small';
                a.style.top = '90px';
                a.style.right = '57px';
                a.style.zIndex = '10000';
                a.innerHTML = "T";
                document.getElementById('ui_box').appendChild(a);
                $("#troopCounterButton").click(function () {
                    createTroopcounterWindow();
                });
            }
        }

        var troops = [
            { "id": 1, "name": "sword" },
            { "id": 2, "name": "archer" },
            { "id": 3, "name": "hoplite" },
            { "id": 4, "name": "slinger" },
            { "id": 5, "name": "rider" },
            { "id": 6, "name": "chariot" },
            { "id": 7, "name": "catapult" },
            { "id": 8, "name": "godsent" },
            { "id": 9, "name": "manticore" },
            { "id": 10, "name": "harpy" },
            { "id": 11, "name": "pegasus" },
            { "id": 12, "name": "griffin" },
            { "id": 13, "name": "cerberus" },
            { "id": 14, "name": "minotaur" },
            { "id": 15, "name": "medusa" },
            { "id": 16, "name": "zyklop" },
            { "id": 17, "name": "centaur" },
            { "id": 18, "name": "sea_monster" },
            { "id": 19, "name": "ladon" },
            { "id": 20, "name": "spartoi" },
            { "id": 21, "name": "small_transporter" },
            { "id": 22, "name": "big_transporter" },
            { "id": 23, "name": "bireme" },
            { "id": 24, "name": "attack_ship" },
            { "id": 25, "name": "trireme" },
            { "id": 26, "name": "colonize_ship" },
            { "id": 27, "name": "siren" },
            { "id": 28, "name": "fury" },
            { "id": 29, "name": "demolition_ship" },
            { "id": 30, "name": "satyr" },
            { "id": 31, "name": "calydonian_boar" }
        ];

        function createTroopcounterWindow() {
            var windowExists = false;
            var windowItem = null;
            for (var item of document.getElementsByClassName('ui-dialog-title')) {
                if (item.innerHTML == "TroopCounter") {
                    windowExists = true;
                    windowItem = item;
                }
            }
            if (!windowExists) {
                var wnd = Layout.wnd.Create(Layout.wnd.TYPE_DIALOG, "TroopCounter");
                wnd.setContent('');
            }
            for (var item of document.getElementsByClassName('ui-dialog-title')) {
                if (item.innerHTML == "TroopCounter") {
                    windowItem = item;
                }
            }
            wnd.setHeight('500');
            wnd.setWidth('750');
            wnd.setTitle("TroopCounter");
            var title = windowItem;
            var frame = title.parentElement.parentElement.children[1].children[4];
            frame.innerHTML = '';



            var html = document.createElement('html');
            var body = document.createElement('div');
            var head = document.createElement('head');
            var element = document.createElement('h3');
            element.innerHTML = "TroopCounter";
            element.style.margin = '0 auto';
            body.appendChild(element);

            var tableContainer = document.createElement('div');
            tableContainer.style.height = '300px';
            tableContainer.style.overflowY = 'auto';

            var table = document.createElement('table');
            table.id = "troopcounterTable";
            table.style.overflowX = 'scroll';

            tableContainer.appendChild(table);
            var headerRow = document.createElement('tr');
            var playernameHeader = document.createElement('th');
            playernameHeader.textContent = 'Playername';
            headerRow.appendChild(playernameHeader);

            troops.forEach(function (troop) {
                var th = document.createElement('th');
                var spanElement = document.createElement('span');
                spanElement.setAttribute('class', 'unit index_unit unit_icon40x40 ' + troop.name);
                th.appendChild(spanElement);
                headerRow.appendChild(th);
            });

            table.appendChild(headerRow);


            body.appendChild(tableContainer);
            frame.appendChild(body);

            // Add login inputs
            var loginDiv = document.createElement('div');
            loginDiv.style.marginTop = "10px";
            loginDiv.innerHTML = `
                        Token: <input type="text" id="token"><br>
                        Key: <input type="text" id="key"><br>
                        <button id="saveButton">Save token & key</button>
                        <button id="loadButton">Laad troepenoverzicht</button>
                        <button id="fetchData">Update eigen data</button>`;
            frame.appendChild(loginDiv);

            if (localStorage.getItem(storagetoken) !== null && localStorage.getItem(storagekey) !== null) {
                document.getElementById('token').value = localStorage.getItem(storagetoken);
                document.getElementById('key').value = localStorage.getItem(storagekey);
            };

            frame.appendChild(loginDiv);
            document.getElementById('saveButton').addEventListener('click', function () {
                var token = document.getElementById('token').value;
                var key = document.getElementById('key').value;
                localStorage.setItem(storagetoken, token);
                localStorage.setItem(storagekey, key);

                setTimeout(function () {
                    location.reload();
                }, 1000);
            });



            // Event listener for login button

            // Event listener for load button
            document.getElementById('loadButton').addEventListener('click', function () {
                fetchTroopCountData();
            });
            document.getElementById('fetchData').addEventListener('click', function () {
                fetchData();
            });
        }

        function fetchTroopCountData() {
            var token = localStorage.getItem(storagetoken);
            var key = localStorage.getItem(storagekey);
            if (!token || !key) {
                console.log('No token & key filled in.');
                return;
            }

            var link = `https://localhost:7003/api/Group/GetGroupPlayersWithTroops?token=${token}&key=${key}&troopTypeStr=all`;

            fetch(link)
                .then(response => response.json())
                .then(data => {
                    updateTroopCounts(data.players);
                })
                .catch(error => {
                    console.error('Error fetching troop count data:', error);
                });
        }

        function createPlayerRow(player) {
            // Check if the player already exists in the table
            var existingRow = document.getElementById('player-' + player.id);
            if (existingRow) {
                // Update existing row with player information
                updatePlayerRow(existingRow, player);
                return existingRow;
            }

            // If the player doesn't exist, create a new row
            var row = document.createElement('tr');
            row.id = 'player-' + player.id;

            var playerNameCell = document.createElement('td');
            playerNameCell.textContent = player.name;
            row.appendChild(playerNameCell);

            // Create a map to store the troop counts for easy lookup
            var troopCountMap = {};
            player.troops.forEach(function (troop) {
                troopCountMap[troop.name] = troop.count;
            });

            troops.forEach(function (troop) {
                var cell = document.createElement('td');
                cell.style.textAlign = "center";

                // If troop count exists in the troop count map, add it to the cell
                if (troopCountMap.hasOwnProperty(troop.name)) {
                    cell.textContent = troopCountMap[troop.name];
                } else {
                    cell.textContent = "0"; // Set count to 0 if not found
                }

                row.appendChild(cell);
            });

            return row;
        }

        function updateTroopCounts(data) {
            var table = document.querySelector('#troopcounterTable'); // Assuming you have only one table in your page
            data.forEach(player => {
                var row = createPlayerRow(player);
                table.appendChild(row);
            });
        }

        function updatePlayerRow(row, player) {
            var playerNameCell = row.querySelector('td:first-child');
            playerNameCell.textContent = player.name;

            var troopCountMap = {};
            player.troops.forEach(function (troop) {
                troopCountMap[troop.name] = troop.count;
            });

            var cells = row.querySelectorAll('td:not(:first-child)');
            cells.forEach(function (cell, index) {
                var troop = troops[index];
                if (troopCountMap.hasOwnProperty(troop.name)) {
                    cell.textContent = troopCountMap[troop.name];
                } else {
                    cell.textContent = "0";
                }
            });
        };

        function createPlayer() {
            const playerId = Game.player_id;
            const playerName = Game.player_name;
            const allianceId = Game.alliance_id;
            const allianceName = MM.getModels().Player[Game.player_id].attributes.alliance_name;

            let formattedData = {
                id: playerId,
                name: playerName,
                allianceId: allianceId,
                allianceName: allianceName,
                token: localStorage.getItem(storagetoken),
                key: localStorage.getItem(storagekey)
            };

            fetch(`https://localhost:7003/api/Player/CreatePlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add player');
                    }
                    console.log('Player added successfully');
                    setTimeout(fetchData, 5000);
                })
                .catch(error => {
                    console.error('Error adding player:', error);
                });
        }

        function fetchData() {
            const playerId = Game.player_id

            let townsObject = ITowns.getTowns();
            let cl = MM.getModels().Player[Game.player_id].attributes.cultural_step;
            let lastUpdated = Date.now().toString();

            let townsData = Object.values(townsObject).map(town => {
                // Fetch home troops
                let homeUnits = town.units();
                let troopsInTown = [];

                // Fetch outer troops
                let outerUnits = town.unitsOuter();
                let outerTroopsInTown = [];

                // Extract home troops for the town if available
                if (homeUnits) {
                    troopsInTown = Object.keys(homeUnits).map(unitType => ({
                        name: unitType,
                        count: homeUnits[unitType]
                    }));
                }

                // Extract outer troops for the town if available
                if (outerUnits) {
                    outerTroopsInTown = Object.keys(outerUnits).map(unitType => ({
                        name: unitType,
                        count: outerUnits[unitType]
                    }));
                }

                return {
                    id: town.id,
                    name: town.name,
                    points: town.getPoints(),
                    availableTroopsInTown: troopsInTown,
                    outerTroopsInTown: outerTroopsInTown
                };
            });

            let formattedData = {
                token: localStorage.getItem(storagetoken),
                key: localStorage.getItem(storagekey),
                lastUpdated: lastUpdated,
                culturalLevel: cl,
                townRequests: townsData
            };

            fetch(`https://localhost:7003/api/Player/AddTownsToPlayer?playerId=${playerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            })
                .then(async response => {
                    if (!response.ok) {
                        var errorMessage = await response.text();
                        if (errorMessage && errorMessage === "Player doesn't exist") {
                            console.log('Failed due to player not existing, creating player');
                            createPlayer();
                        }
                    } else {
                        console.log('Towns data sent successfully');
                    }
                })
                .catch(error => {
                    console.error('Error sending towns data:', error);
                });
        };
    });
})();

