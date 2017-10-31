import * as React from 'react';
import { numberToWords } from 'number-to-words';

interface Props {
    content: string,
    cardName?: string
}

export const CardSymbols: React.StatelessComponent<Props> = ({content, cardName}) => {
    const contentSections = content.split(/({\w})/g);
    console.log(cardName)
    console.log(contentSections); 
    return (
        <text>
            {contentSections.map((contentSection, key) => {
                if (contentSection.indexOf('{') > -1) {
                    const symbolCharacter = contentSection.replace(/}/g,'').replace(/{/g, '').trim();
                    const symbolClass = `card-symbol card-symbol-${symbolCharacter}`;
                    let symbolTitle = '';
                    // TODO: Replace this with results from fetchCardSymbology and filter that way.
                    switch (symbolCharacter)
                    {
                        case '':
                            symbolTitle = "";
                            break;
                        case 'T':
                            symbolTitle = "tap this permanent";
                            break;
                        case 'Q':
                            symbolTitle = "untap this permanent";
                            break;
                        case 'E':
                            symbolTitle = "an energy counter";
                            break;
                        case 'PW':
                            symbolTitle = "planeswalker";
                            break;
                        case 'CHAOS':
                            symbolTitle = "chaos";
                            break;
                        case 'X':
                            symbolTitle = "X generic mana";
                            break;
                        case 'Y':
                            symbolTitle = "Y generic mana";
                            break;
                        case 'Z':
                            symbolTitle = "Z generic mana";
                            break;
                        case '½':
                            symbolTitle = "one-half generic mana";
                            break;
                        case '∞':
                            symbolTitle = "infinite generic mana";
                            break;
                        case 'W/U':
                            symbolTitle = "one white or blue mana";
                            break;
                        case 'W/B':
                            symbolTitle = "one white or black mana";
                            break;
                        case 'B/R':
                            symbolTitle = "one black or red mana";
                            break;
                        case 'B/G':
                            symbolTitle = "one black or green mana";
                            break;
                        case 'U/B':
                            symbolTitle = "one blue or black mana";
                            break;
                        case 'U/R':
                            symbolTitle = "";
                            break;
                        case 'HR':
                            symbolTitle = "one-half red mana";
                            break;
                        case 'HW':
                            symbolTitle = "one-half white mana";
                            break;
                        case 'U':
                            symbolTitle = "one blue mana";
                            break;
                        case 'W':
                            symbolTitle = "one white mana";
                            break;
                        case 'B':
                            symbolTitle = "one black mana";
                            break;
                        case 'R':
                            symbolTitle = "one red mana";
                            break;
                        case 'G':
                            symbolTitle = "one green mana";
                            break;
                        case 'C':
                            symbolTitle = "one colorless mana";
                            break;
                        default:
                            const numberString = numberToWords.toWords(symbolCharacter);
                            symbolTitle = `${numberString} generic mana`;
                            break;
                    }
                    return (
                        <abbr className={symbolClass} title={symbolTitle} key={key}>{contentSection}</abbr>
                    );
                } else {
                    return (
                        <text>{contentSection}</text>
                    )
                }
            })}
        </text>
    )
}