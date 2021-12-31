const getTopFaceVertices = (config, width) => {
    return [
        config['click3'].x,
        config['click3'].y,
        config['click3'].x - width,
        config['click3'].y,
        config['click1'].x,
        config['click1'].y,
        config['click1'].x + width,
        config['click1'].y
    ]
}

const getSideFaceVertices = (config, width, height) => {
    return [
        config['click3'].x,
        config['click3'].y,
        config['click1'].x + width,
        config['click1'].y,
        config['click2'].x,
        config['click2'].y,
        config['click3'].x,
        height + config['click3'].y
    ]
}

export default {getTopFaceVertices, getSideFaceVertices}
