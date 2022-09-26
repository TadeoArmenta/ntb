import { isEmptyObject } from "../utils";

test('Emptiness of void check', ()=>{
    expect(isEmptyObject({})).toBe(true)
});