export const singlyLinkedListOperations = {
  cpp: {
    code: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class SinglyLinkedList {
public:
    Node* head;

    SinglyLinkedList() : head(nullptr) {}

    // Insert at end
    void insertAtEnd(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    // Insert at index
    void insertAtIndex(int val, int index) {
        if (index < 0) return;
        Node* newNode = new Node(val);
        if (index == 0) {
            newNode->next = head;
            head = newNode;
            return;
        }
        Node* temp = head;
        for (int i = 0; i < index - 1 && temp; i++) {
            temp = temp->next;
        }
        if (!temp) return;
        newNode->next = temp->next;
        temp->next = newNode;
    }

    // Delete node
    void deleteNode(int val) {
        if (!head) return;
        if (head->data == val) {
            Node* toDelete = head;
            head = head->next;
            delete toDelete;
            return;
        }
        Node* temp = head;
        while (temp->next && temp->next->data != val) {
            temp = temp->next;
        }
        if (!temp->next) return;
        Node* toDelete = temp->next;
        temp->next = temp->next->next;
        delete toDelete;
    }

    // Search node
    bool search(int val) {
        Node* temp = head;
        while (temp) {
            if (temp->data == val) return true;
            temp = temp->next;
        }
        return false;
    }

    // Traverse list
    void traverse() {
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
};`,
    lineHighlighting: {
      "node-creation": [4, 5, 6],
      "list-initialization": [10, 11],
      "insert-at-end": [14, 15, 16, 17, 18, 19, 20, 21, 22],
      "insert-at-index": [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
      "delete-node": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      "search-node": [54, 55, 56, 57, 58, 59],
      "traverse-list": [63, 64, 65, 66, 67, 68],
    },
  },
  java: {
    code: `class Node {
    int data;
    Node next;
    Node(int val) { data = val; next = null; }
}

class SinglyLinkedList {
    Node head;

    // Insert at end
    void insertAtEnd(int val) {
        Node newNode = new Node(val);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    // Insert at index
    void insertAtIndex(int val, int index) {
        if (index < 0) return;
        Node newNode = new Node(val);
        if (index == 0) {
            newNode.next = head;
            head = newNode;
            return;
        }
        Node temp = head;
        for (int i = 0; i < index - 1 && temp != null; i++) {
            temp = temp.next;
        }
        if (temp == null) return;
        newNode.next = temp.next;
        temp.next = newNode;
    }

    // Delete node
    void deleteNode(int val) {
        if (head == null) return;
        if (head.data == val) {
            head = head.next;
            return;
        }
        Node temp = head;
        while (temp.next != null && temp.next.data != val) {
            temp = temp.next;
        }
        if (temp.next == null) return;
        temp.next = temp.next.next;
    }

    // Search node
    boolean search(int val) {
        Node temp = head;
        while (temp != null) {
            if (temp.data == val) return true;
            temp = temp.next;
        }
        return false;
    }

    // Traverse list
    void traverse() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
}`,
    lineHighlighting: {
      "node-creation": [1, 2, 3],
      "list-initialization": [6],
      "insert-at-end": [9, 10, 11, 12, 13, 14, 15, 16, 17],
      "insert-at-index": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      "delete-node": [35, 36, 37, 38, 39, 40, 41, 42, 43],
      "search-node": [47, 48, 49, 50, 51],
      "traverse-list": [55, 56, 57, 58, 59],
    },
  },
  python: {
    code: `class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    # Insert at end
    def insertAtEnd(self, val):
        newNode = Node(val)
        if not self.head:
            self.head = newNode
            return
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = newNode

    # Insert at index
    def insertAtIndex(self, val, index):
        if index < 0:
            return
        newNode = Node(val)
        if index == 0:
            newNode.next = self.head
            self.head = newNode
            return
        temp = self.head
        for _ in range(index - 1):
            if not temp:
                return
            temp = temp.next
        if not temp:
            return
        newNode.next = temp.next
        temp.next = newNode

    # Delete node
    def deleteNode(self, val):
        if not self.head:
            return
        if self.head.data == val:
            self.head = self.head.next
            return
        temp = self.head
        while temp.next and temp.next.data != val:
            temp = temp.next
        if not temp.next:
            return
        temp.next = temp.next.next

    # Search node
    def search(self, val):
        temp = self.head
        while temp:
            if temp.data == val:
                return True
            temp = temp.next
        return False

    # Traverse list
    def traverse(self):
        temp = self.head
        while temp:
            print(temp.data, "->", end=" ")
            temp = temp.next
        print("None")`,
    lineHighlighting: {
      "node-creation": [1, 2, 3],
      "list-initialization": [6, 7],
      "insert-at-end": [10, 11, 12, 13, 14, 15, 16, 17],
      "insert-at-index": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      "delete-node": [35, 36, 37, 38, 39, 40, 41, 42, 43],
      "search-node": [47, 48, 49, 50, 51],
      "traverse-list": [55, 56, 57, 58, 59],
    },
  },
  javascript: {
    code: `class Node {
    constructor(val) {
        this.data = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    // Insert at end
    insertAtEnd(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    // Insert at index
    insertAtIndex(val, index) {
        if (index < 0) return;
        const newNode = new Node(val);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        let temp = this.head;
        for (let i = 0; i < index - 1 && temp; i++) {
            temp = temp.next;
        }
        if (!temp) return;
        newNode.next = temp.next;
        temp.next = newNode;
    }

    // Delete node
    deleteNode(val) {
        if (!this.head) return;
        if (this.head.data === val) {
            this.head = this.head.next;
            return;
        }
        let temp = this.head;
        while (temp.next && temp.next.data !== val) {
            temp = temp.next;
        }
        if (!temp.next) return;
        temp.next = temp.next.next;
    }

    // Search node
    search(val) {
        let temp = this.head;
        while (temp) {
            if (temp.data === val) return true;
            temp = temp.next;
        }
        return false;
    }

    // Traverse list
    traverse() {
        let temp = this.head;
        while (temp) {
            process.stdout.write(temp.data + " -> ");
            temp = temp.next;
        }
        console.log("NULL");
    }
}`,
    lineHighlighting: {
      "node-creation": [1, 2, 3, 4],
      "list-initialization": [8, 9],
      "insert-at-end": [12, 13, 14, 15, 16, 17, 18, 19, 20],
      "insert-at-index": [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "delete-node": [38, 39, 40, 41, 42, 43, 44, 45, 46],
      "search-node": [50, 51, 52, 53, 54],
      "traverse-list": [58, 59, 60, 61, 62],
    },
  },
};
