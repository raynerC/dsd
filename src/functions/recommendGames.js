function getSimilarDocuments (id, trainedData){
    let similarDocuments = trainedData[id];

    if (similarDocuments === undefined) {
        return [];
    }

    return similarDocuments;
};

function recommendGames(gameName){
    const similarityTable = require('./similarityTable.json');
    return getSimilarDocuments(gameName, similarityTable);
}

module.exports = { recommendGames };