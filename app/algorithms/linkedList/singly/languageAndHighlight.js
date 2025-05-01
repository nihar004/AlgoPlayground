export const singlyLinkedListImplementation = {
  cpp: {
    insertion: {
      insertHead: `void insertHead(int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    head = newNode;
}`,

      insertTail: `void insertTail(int val) {
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
}`,

      insertAt: `void insertAt(int val, int index) {
    if (index < 0) return;
    if (index == 0) {
        insertHead(val);
        return;
    }
    Node* newNode = new Node(val);
    Node* temp = head;
    for (int i = 0; i < index - 1 && temp; i++) {
        temp = temp->next;
    }
    if (!temp) return;
    newNode->next = temp->next;
    temp->next = newNode;
}`,
    },

    deletion: {
      deleteHead: `void deleteHead() {
    if (!head) return;
    Node* toDelete = head;
    head = head->next;
    delete toDelete;
}`,

      deleteTail: `void deleteTail() {
    if (!head) return;
    if (!head->next) {
        delete head;
        head = nullptr;
        return;
    }
    Node* temp = head;
    while (temp->next->next) {
        temp = temp->next;
    }
    delete temp->next;
    temp->next = nullptr;
}`,

      deleteValue: `void deleteValue(int val) {
    if (!head) return;
    if (head->data == val) {
        deleteHead();
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
}`,

      deleteAt: `void deleteAt(int index) {
    if (index < 0 || !head) return;
    if (index == 0) {
        deleteHead();
        return;
    }
    Node* temp = head;
    for (int i = 0; i < index - 1 && temp; i++) {
        temp = temp->next;
    }
    if (!temp || !temp->next) return;
    Node* toDelete = temp->next;
    temp->next = temp->next->next;
    delete toDelete;
}`,
    },

    traversal: {
      traverse: `void traverse() {
    Node* temp = head;
    while (temp) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}`,

      length: `int length() {
    int count = 0;
    Node* temp = head;
    while (temp) {
        count++;
        temp = temp->next;
    }
    return count;
}`,

      search: `bool search(int val) {
    Node* temp = head;
    while (temp) {
        if (temp->data == val) return true;
        temp = temp->next;
    }
    return false;
}`,
    },

    utility: {
      reverse: `void reverse() {
    Node *prev = nullptr, *curr = head, *next = nullptr;
    while (curr) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    head = prev;
}`,

      middle: `Node* middle() {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
    },

    cycle: {
      detectCycle: `bool detectCycle() {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,

      cycleSize: `int cycleSize() {
    if (!detectCycle()) return 0;
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }
    int size = 1;
    fast = fast->next;
    while (slow != fast) {
        size++;
        fast = fast->next;
    }
    return size;
}`,
    },
  },

  java: {
    insertion: {
      insertHead: `void insertHead(int val) {
    Node newNode = new Node(val);
    newNode.next = head;
    head = newNode;
}`,

      insertTail: `void insertTail(int val) {
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
}`,

      insertAt: `void insertAt(int val, int index) {
    if (index < 0) return;
    if (index == 0) {
        insertHead(val);
        return;
    }
    Node newNode = new Node(val);
    Node temp = head;
    for (int i = 0; i < index - 1 && temp != null; i++) {
        temp = temp.next;
    }
    if (temp == null) return;
    newNode.next = temp.next;
    temp.next = newNode;
}`,
    },

    deletion: {
      deleteHead: `void deleteHead() {
    if (head == null) return;
    head = head.next;
}`,

      deleteTail: `void deleteTail() {
    if (head == null) return;
    if (head.next == null) {
        head = null;
        return;
    }
    Node temp = head;
    while (temp.next.next != null) {
        temp = temp.next;
    }
    temp.next = null;
}`,

      deleteValue: `void deleteValue(int val) {
    if (head == null) return;
    if (head.data == val) {
        deleteHead();
        return;
    }
    Node temp = head;
    while (temp.next != null && temp.next.data != val) {
        temp = temp.next;
    }
    if (temp.next == null) return;
    temp.next = temp.next.next;
}`,

      deleteAt: `void deleteAt(int index) {
    if (index < 0 || head == null) return;
    if (index == 0) {
        deleteHead();
        return;
    }
    Node temp = head;
    for (int i = 0; i < index - 1 && temp != null; i++) {
        temp = temp.next;
    }
    if (temp == null || temp.next == null) return;
    temp.next = temp.next.next;
}`,
    },

    traversal: {
      traversal: `void traversal() {
    Node temp = head;
    while (temp != null) {
        System.out.print(temp.data + " -> ");
        temp = temp.next;
    }
    System.out.println("NULL");
}`,

      length: `int length() {
    int count = 0;
    Node temp = head;
    while (temp != null) {
        count++;
        temp = temp.next;
    }
    return count;
}`,

      search: `boolean search(int val) {
    Node temp = head;
    while (temp != null) {
        if (temp.data == val) return true;
        temp = temp.next;
    }
    return false;
}`,
    },

    utility: {
      reverse: `void reverse() {
    Node prev = null, curr = head, next = null;
    while (curr != null) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    head = prev;
}`,

      middle: `Node middle() {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
    },

    cycle: {
      detectCycle: `boolean detectCycle() {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,

      cycleSize: `int cycleSize() {
    if (!detectCycle()) return 0;
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    int size = 1;
    fast = fast.next;
    while (slow != fast) {
        size++;
        fast = fast.next;
    }
    return size;
}`,
    },
  },

  python: {
    insertion: {
      insertHead: `def insertHead(self, val):
    newNode = Node(val)
    newNode.next = self.head
    self.head = newNode`,

      insertTail: `def insertTail(self, val):
    newNode = Node(val)
    if not self.head:
        self.head = newNode
        return
    temp = self.head
    while temp.next:
        temp = temp.next
    temp.next = newNode`,

      insertAt: `def insertAt(self, val, index):
    if index < 0:
        return
    if index == 0:
        self.insertHead(val)
        return
    newNode = Node(val)
    temp = self.head
    for _ in range(index - 1):
        if not temp:
            return
        temp = temp.next
    if not temp:
        return
    newNode.next = temp.next
    temp.next = newNode`,
    },

    deletion: {
      deleteHead: `def deleteHead(self):
    if not self.head:
        return
    self.head = self.head.next`,

      deleteTail: `def deleteTail(self):
    if not self.head:
        return
    if not self.head.next:
        self.head = None
        return
    temp = self.head
    while temp.next.next:
        temp = temp.next
    temp.next = None`,

      deleteValue: `def deleteValue(self, val):
    if not self.head:
        return
    if self.head.data == val:
        self.deleteHead()
        return
    temp = self.head
    while temp.next and temp.next.data != val:
        temp = temp.next
    if not temp.next:
        return
    temp.next = temp.next.next`,

      deleteAt: `def deleteAt(self, index):
    if index < 0 or not self.head:
        return
    if index == 0:
        self.deleteHead()
        return
    temp = self.head
    for _ in range(index - 1):
        if not temp:
            return
        temp = temp.next
    if not temp or not temp.next:
        return
    temp.next = temp.next.next`,
    },

    traversal: {
      traversal: `def traversal(self):
    temp = self.head
    while temp:
        print(temp.data, "->", end=" ")
        temp = temp.next
    print("None")`,

      length: `def length(self):
    count = 0
    temp = self.head
    while temp:
        count += 1
        temp = temp.next
    return count`,

      search: `def search(self, val):
    temp = self.head
    while temp:
        if temp.data == val:
            return True
        temp = temp.next
    return False`,
    },

    utility: {
      reverse: `def reverse(self):
    prev, curr = None, self.head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    self.head = prev`,

      middle: `def middle(self):
    slow = fast = self.head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
    },

    cycle: {
      detectCycle: `def detectCycle(self):
    slow = fast = self.head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,

      cycleSize: `def cycleSize(self):
    if not self.detectCycle():
        return 0
    slow = fast = self.head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    size = 1
    fast = fast.next
    while slow != fast:
        size += 1
        fast = fast.next
    return size`,
    },
  },

  javascript: {
    insertion: {
      insertHead: `insertHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
}`,

      insertTail: `insertTail(val) {
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
}`,

      insertAt: `insertAt(val, index) {
    if (index < 0) return;
    if (index === 0) {
        this.insertHead(val);
        return;
    }
    const newNode = new Node(val);
    let temp = this.head;
    for (let i = 0; i < index - 1 && temp; i++) {
        temp = temp.next;
    }
    if (!temp) return;
    newNode.next = temp.next;
    temp.next = newNode;
}`,
    },

    deletion: {
      deleteHead: `deleteHead() {
    if (!this.head) return;
    this.head = this.head.next;
}`,

      deleteTail: `deleteTail() {
    if (!this.head) return;
    if (!this.head.next) {
        this.head = null;
        return;
    }
    let temp = this.head;
    while (temp.next.next) {
        temp = temp.next;
    }
    temp.next = null;
}`,

      deleteValue: `deleteValue(val) {
    if (!this.head) return;
    if (this.head.data === val) {
        this.deleteHead();
        return;
    }
    let temp = this.head;
    while (temp.next && temp.next.data !== val) {
        temp = temp.next;
    }
    if (!temp.next) return;
    temp.next = temp.next.next;
}`,

      deleteAt: `deleteAt(index) {
    if (index < 0 || !this.head) return;
    if (index === 0) {
        this.deleteHead();
        return;
    }
    let temp = this.head;
    for (let i = 0; i < index - 1 && temp; i++) {
        temp = temp.next;
    }
    if (!temp || !temp.next) return;
    temp.next = temp.next.next;
}`,
    },

    traversal: {
      traversal: `traversal() {
    let temp = this.head;
    while (temp) {
        process.stdout.write(temp.data + " -> ");
        temp = temp.next;
    }
    console.log("NULL");
}`,

      length: `length() {
    let count = 0;
    let temp = this.head;
    while (temp) {
        count++;
        temp = temp.next;
    }
    return count;
}`,

      search: `search(val) {
    let temp = this.head;
    while (temp) {
        if (temp.data === val) return true;
        temp = temp.next;
    }
    return false;
}`,
    },

    utility: {
      reverse: `reverse() {
    let prev = null, curr = this.head, next = null;
    while (curr) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    this.head = prev;
}`,

      middle: `middle() {
    let slow = this.head, fast = this.head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
    },

    cycle: {
      detectCycle: `detectCycle() {
    let slow = this.head, fast = this.head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`,

      cycleSize: `cycleSize() {
    if (!this.detectCycle()) return 0;
    let slow = this.head, fast = this.head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    let size = 1;
    fast = fast.next;
    while (slow !== fast) {
        size++;
        fast = fast.next;
    }
    return size;
}`,
    },
  },
};
