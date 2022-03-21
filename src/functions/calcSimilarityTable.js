const TfIdf = require('node-tfidf'); //npm i --save-dev @types/node-tfidf
const Vector = require('vector-object'); //npm i --save-dev @types/node-tfidf

let formattedData;
let vectorData;
let similarityTable;

const formatData = data => {
    let formatted = [];
    let feature = "";

    data.forEach((value, index) => {
        const { itemId, popular_tags } = value;

        let tmpObj = {};
        feature = popular_tags.split(",");

        const desc = feature.map(l => {
            return l.toLowerCase();
        });

        tmpObj = {
            id: itemId.toString(),
            content: desc.join(" ")
        };

        formatted.push(tmpObj);
    });

    return formatted;
};

// eslint-disable-next-line
const getLength = () => {
    let l = 0;

    this.getComponents().forEach(k => {
        l += this.vector[k] * this.vector[k];
    });

    return Math.sqrt(l);
}

// eslint-disable-next-line
const getCosineSimilarity = (vector) => {
    return this.getDotProduct(vector) / (this.getLength() * vector.getLength());
}

const getSimilarDocuments = (id, trainedData) => {
    let similarDocuments = trainedData[id];

    if (similarDocuments === undefined) {
        return [];
    }

    return similarDocuments;
};

const createVectorsFromDocs = processedDocs => {
    const tfidf = new TfIdf();

    processedDocs.forEach(processedDocument => {
        tfidf.addDocument(processedDocument.content);
    });

    const documentVectors = [];

    for (let i = 0; i < processedDocs.length; i += 1) {
        const processedDocument = processedDocs[i];
        const obj = {};

        const items = tfidf.listTerms(i);

        for (let j = 0; j < items.length; j += 1) {
            const item = items[j];
            obj[item.term] = item.tfidf;
        }

        const documentVector = {
            id: processedDocument.id,
            vector: new Vector(obj)
        };

        documentVectors.push(documentVector);
    }

    return documentVectors
}

const calcSimilarities = docVectors => {
    // number of results that you want to return.
    const MAX_SIMILAR = 5;
    // min cosine similarity score that should be returned.
    const MIN_SCORE = 0.2;
    const data = {};

    for (let i = 0; i < docVectors.length; i += 1) {
        const documentVector = docVectors[i];
        const { id } = documentVector;

        data[id] = [];
    }

    for (let i = 0; i < docVectors.length; i += 1) {
        for (let j = 0; j < i; j += 1) {
            const idi = docVectors[i].id;
            const vi = docVectors[i].vector;
            const idj = docVectors[j].id;
            const vj = docVectors[j].vector;

            const similarity = vi.getCosineSimilarity(vj);

            if (similarity > MIN_SCORE) {
                data[idi].push({ id: idj, score: similarity });
                data[idj].push({ id: idi, score: similarity });
            }
        }
    }

    // finally sort the similar documents by descending order
    Object.keys(data).forEach(id => {
        data[id].sort((a, b) => b.score - a.score);

        if (data[id].length > MAX_SIMILAR) {
            data[id] = data[id].slice(0, MAX_SIMILAR);
        }
    });

    return data;
}

// eslint-disable-next-line
async function calcSimilarityTable() {
    return new Promise(resolve => {
        const gamesData = require('./games.json');

        console.time("Similarity Table Calculation Duration");

        formattedData = formatData(gamesData).filter(data => data.content !== 'nan'); // format data
        
        // crate vector
        //vectorData = createVectorsFromDocs(formattedData)  //full 
        vectorData = createVectorsFromDocs(formattedData.slice(0, 2000))

        similarityTable = calcSimilarities(vectorData)  // compute cosine similarities

        console.timeEnd("Similarity Table Calculation Duration");

        resolve(similarityTable);
    })
}

// eslint-disable-next-line
async function saveSimilarityTable(data) {
    const fs = require("fs");
    const filePath = `./src/functions/similarityTable.json`;

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), "utf8", err => {
            err ? reject(err) : resolve(`Similarity Table saved into ${filePath}.`);
        });
    })
}


calcSimilarityTable().then(data => saveSimilarityTable(data)).then(console.log);