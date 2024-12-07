import { Button } from "../components/ui/Button";
import { useState } from "react";
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Switch } from "../components/ui/Switch";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/Table";

export default function ComponentTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Button>Click me</Button>

      <hr className="my-4" />

      <div>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

        <hr className="my-4" />

        <Input placeholder="Enter your name" />

        <hr className="my-4" />

        <p>WIP</p>

        <Switch
          checked={enabled}
          onChange={setEnabled}
          aria-label="Toggle feature"
        />

        <Switch
          checked={enabled}
          onChange={setEnabled}
          variant="accent"
          aria-label="Toggle theme"
        />

        <Switch
          checked={enabled}
          onChange={setEnabled}
          disabled
          aria-label="Toggle notifications"
        />

        <hr className="my-4" />

        <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="md"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>Modal content goes here...</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
