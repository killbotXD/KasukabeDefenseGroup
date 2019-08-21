pragma solidity ^0.5.0;

contract Election {
    
    uint8 public __numberOfCandidates;
    uint8 public __numberOfVoters;
    
    struct Candidate {
        uint8 __slot;
        string __name;
        string __partyName;
        uint8 __numberOfVotes;
    }
    
    struct Voter {
        string _voterId;
        bool isVoted;
    }
    
    mapping (uint8 => Candidate) public candidates;
    mapping (string => Voter) voters;
    
    function addCandidate (string memory _name, string memory _partyName) public {
        candidates[__numberOfCandidates] = Candidate(__numberOfCandidates ,_name, _partyName, 0);
        __numberOfCandidates++;
    }
    
    function castVote (string memory voterId ,uint8 slotSelected) public {
        voters[voterId] = Voter(voterId, false);
        candidates[slotSelected].__numberOfVotes++;
        voters[voterId].isVoted = true;
    }
    
    function getStats (uint8 slot) public view returns(uint8) {
            return candidates[slot].__numberOfVotes;
    } 
}