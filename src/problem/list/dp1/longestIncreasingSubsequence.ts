import { Problem, ProblemState, Variable } from "../../Problem";
import { asArray, asSingleValue } from "../../service";

function longestIncreasingSubsequence(p: LISInput): ProblemState[] {
    const s: ProblemState[] = [];
    const { nums } = p;
    const dp: number[] = new Array(nums.length).fill(1);
    s.push({
        variables: [
            asArray("nums", nums),
            asArray("dp", dp),
        ],
        breakpoint: 1,
    }); //#1

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                s.push({
                    variables: [
                        asArray("dp", dp, i),
                        asArray("nums", nums, i, j),
                        ...asSingleValue({ i, j }),
                    ],
                    breakpoint: 2,
                }); //#2
            }
        }
    }

    const result = Math.max(...dp);
    s.push({
        variables: [
            asArray("nums", nums),
            asArray("dp", dp),
            ...asSingleValue({ result }),
        ],
        breakpoint: 3,
    }); //#3
    return s;
}

interface LISInput {
    nums: number[];
}

const code = `function longestIncreasingSubsequence(nums) {
    const dp = new Array(nums.length).fill(1); 
    //#1
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1); 
                //#2
            }
        }
    }
    const result = Math.max(...dp); 
    //#3
    return result;
}`;

const title = "Longest Increasing Subsequence";
const getInput = () => ({ nums: [10, 9, 2, 5, 3, 7, 101, 18] });

export const longestIncreasingSubsequenceProblem: Problem<LISInput, ProblemState> = {
    title: title,
    code: code,
    getInput: getInput,
    func: longestIncreasingSubsequence,
};
