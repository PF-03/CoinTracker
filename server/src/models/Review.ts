//MODELO PARA REVIEWS DE LA PAGINA

//Mongo da una id predeterminadamente, no es necesario declarar
const reviewSchema = new Schema({
    user: {
        type: String,
    },
    calification: {
        type: Number,
    },
    comment: {
        type: String,
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

const reviewModel = model("Review", reviewSchema);

module.exports = reviewModel;