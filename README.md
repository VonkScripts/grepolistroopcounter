# Troopcounter Script (English guide)

## Disclaimer

This script is currently under review for use on the NL Grepolis servers and cannot be used until it has been approved. Once approved, it should only be used on the NL servers. I am not responsible for any misuse of this script, including manipulating it to perform unauthorized actions. If you get banned for using or abusing this script, I am not responsible.

## Overview
The Troopcounter script is a custom-developed tool designed for players of the game Grepolis to track and manage troop data efficiently. This tool enables synchronization of troop information with a central server, viewing troop counts of group members, and regular updates of your own data. It is particularly useful for players who are part of an organized group and wish to maintain an overview of collective troop strength.


## Features
* Group Synchronization: Synchronize your troop data with a server using a group-specific token and key.
* Manual Data Submission: You can manually update your troop data at any time by clicking a button.
* Local Storage: Your token and key are stored locally when you click on the save token & key button, so you don't need to re-enter them every time you play.
* Encryption: Your user data is securely encrypted using CryptJS. The encryption key is essential for decrypting this data. Without the key, the data remains inaccessible and unusable.
##  How It Works
### Token and Key
To effectively use the Troopcounter, you must enter a token and key associated with your group. These credentials are essential for encrypting and sending your data to the server and retrieving and decrypting troop data of other group members.

* If you do not fill in a token and key, you will not be able to send or retrieve data from the API.
* If you enter a valid token and key for an existing group, you will be able to both send your data and retrieve troop counts for all members of the group.
* The token and key are stored locally in the browser's local storage, meaning they will persist between sessions on the same device. However, they are not shared across different devices.

### Data Submission
* Manual Submission: You can also manually submit your troop data at any time by clicking the "Update own data" button.
### Installation
1. Install a user script manager like Tampermonkey for your browser.
2. Add the Troopcounter script via the following link: [Troopcounter Script.](https://greasyfork.org/en/scripts/503469-troopcounter)
3. Open Grepolis and start using the Troopcounter by entering your group's token and key.

### Support

You can always join our Discord server for feature suggestions or if you need assistance. [Discord.](https://discord.gg/rvETEWWQmf)

# Troepenteller Script (Nederlands handleiding)

## Disclaimer

Dit script is momenteel in beoordeling voor gebruik op de NL Grepolis-servers en kan niet worden gebruikt totdat het is goedgekeurd. Na goedkeuring mag het alleen worden gebruikt op de NL-servers. Ik ben niet verantwoordelijk voor misbruik van dit script, inclusief het manipuleren ervan om ongeautoriseerde acties uit te voeren. Als je wordt verbannen door het gebruik of misbruik van dit script, ben ik niet verantwoordelijk.

## Overzicht
Het Troepenteller-script is een op maat gemaakte tool voor spelers van het spel Grepolis om troepen efficiënt te volgen en te beheren. Met deze tool kun je troepeninformatie synchroniseren met een centrale server, de troepenaantallen van groepsleden bekijken en regelmatig je eigen gegevens bijwerken. Dit is vooral handig voor spelers die deel uitmaken van een georganiseerde groep en een overzicht willen houden van de collectieve troepensterkte.


## Functies
* Groep Synchronisatie: Synchroniseer je troepgegevens met een server met behulp van een groepsspecifieke token en sleutel.
* Handmatige Gegevensinzending: Je kunt je troepgegevens op elk moment handmatig bijwerken door op een knop te klikken.
* Lokale Opslag: Je token en sleutel worden lokaal opgeslagen als je op de save token & key knop klikt, zodat je ze niet elke keer hoeft in te voeren.
* Versleuteling: Uw gebruikersgegevens worden veilig versleuteld met CryptJS. De versleutelingssleutel is essentieel voor het ontsleutelen van deze gegevens. Zonder de sleutel blijven de gegevens ontoegankelijk en niet bruikbaar.
## Hoe Het Werkt
### Token en Sleutel
Om de Troepenteller effectief te gebruiken, moet je een token en sleutel invoeren die gekoppeld zijn aan je groep. Deze gegevens zijn essentieel voor het versturen van je gegevens naar de server en het ophalen van troepeninformatie van andere groepsleden.

* Als je geen token en sleutel invult, kun je geen gegevens versturen naar de API en ook geen gegevens opvragen.
* Als je een geldige token en sleutel invoert voor een bestaande groep, kun je zowel je gegevens versturen als de troepenaantallen van alle leden van de groep opvragen.
* De token en sleutel worden lokaal opgeslagen in de browser's local storage, wat betekent dat ze bewaard blijven tussen sessies op hetzelfde apparaat. Ze worden echter niet gedeeld tussen verschillende apparaten.

### Gegevensinzending
* Handmatige Inzending: Je kunt je troepgegevens ook op elk moment handmatig indienen door op de knop "Update eigen data" te klikken.
### Installatie
1. Installeer een gebruikersscriptbeheerder zoals Tampermonkey voor je browser.
2. Voeg het Troepenteller-script toe via de volgende link: [Troepenteller Script.](https://greasyfork.org/en/scripts/503469-troopcounter)
3. Open Grepolis en begin met het gebruiken van de Troepenteller door de token en sleutel van je groep in te voeren.

### Support

Je kunt altijd onze Discord-server joinen voor het doen van functievoorstellen of als je hulp nodig hebt. [Discord.](https://discord.gg/rvETEWWQmf)

![overview](overview.png)

![overview](active-overview.png)
