pragma circom 2.0.0;
include "node_modules/circomlib/circuits/poseidon.circom";
template age(){
    signal input age;
    signal input salt;

    signal output hash;
    component poseidon = Poseidon(1);
    
    poseidon.inputs[0] <== age+salt;
    hash <== poseidon.out;
}
component main = age();