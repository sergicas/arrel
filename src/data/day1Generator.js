import { day1Library, fixedAnchorTask } from './day1Library';

export const generateDay1 = (scores) => {
    // Convert scores object to array of [key, value]
    const sortedScores = Object.entries(scores).sort(([, scoreA], [, scoreB]) => scoreA - scoreB);

    // MAPPING: Protocol 0 Blocks -> Task Library Areas
    const KEY_MAP = {
        'energy': 'physical',
        'attention': 'mental',
        'lived_time': 'intellectual',
        // Fallbacks if old data persists (though we wiped it)
        'physical': 'physical',
        'mental': 'mental',
        'emotional': 'emotional',
        'social': 'social',
        'intellectual': 'intellectual'
    };

    // Priority 1: The lowest score (most negative)
    const p1Key = sortedScores[0][0];
    // Priority 2: In Protocol 0 we might only have 3 scores. 
    // If strict 3 blocks, we take the second lowest.
    const p2Key = sortedScores[1] ? sortedScores[1][0] : sortedScores[0][0];

    const p1TaskData = day1Library[KEY_MAP[p1Key] || 'physical'];
    const p2TaskData = day1Library[KEY_MAP[p2Key] || 'mental'];

    return {
        day: 1,
        title: "PUNT ZERO",
        message: "Avui no cal fer més. Ataquem només on el desgast és urgent.",
        tasks: [
            {
                area: `PRIORITAT 1 (${p1TaskData.label})`,
                action: p1TaskData.friction.action,
                description: p1TaskData.friction.description,
                goal: p1TaskData.friction.goal,
                duration: "5-7 min"
            },
            {
                area: `PRIORITAT 2 (${p2TaskData.label})`,
                action: p2TaskData.micro.action,
                description: p2TaskData.micro.description,
                goal: p2TaskData.micro.goal,
                duration: "5 min"
            },
            {
                area: "ÀNCORA",
                action: fixedAnchorTask.action,
                description: fixedAnchorTask.description,
                goal: fixedAnchorTask.goal,
                duration: "3 min"
            }
        ]
    };
};
