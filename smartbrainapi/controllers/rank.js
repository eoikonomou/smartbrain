const emojis = [
    '😄', '😃', '😀', '😊', '😉', '😍', '🔶', '🔷', '🚀'
];

module.exports.rank = (req, res) => {
    const rank = req.query.rank;
    const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];
    res.json({ badge: rankEmoji });
}
