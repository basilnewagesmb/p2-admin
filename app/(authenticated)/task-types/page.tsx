"use client";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { SearchableHeader } from "@/components/ui/SearchableHeader";
import { PaginationClient } from "@/components/ui/PaginationClient";
import { Edit, Trash2, Plus, AlertTriangle } from "lucide-react";

const columns = [
  { name: "#", uid: "serial" },
  { name: "Task Type", uid: "name" },
  { name: "Description", uid: "description" },
  { name: "Status", uid: "status" },
  { name: "Created Date", uid: "createdDate" },
  { name: "Actions", uid: "actions" },
];

const initialTaskTypes = [
  {
    id: 1,
    name: "Painting",
    description: "All painting services including interior and exterior.",
    status: "active",
    createdDate: "10 Jan 2025",
  },
  {
    id: 2,
    name: "Drywall",
    description: "Drywall installation, repair, and finishing.",
    status: "active",
    createdDate: "09 Jan 2025",
  },
  {
    id: 3,
    name: "Demo",
    description: "Demolition and removal services.",
    status: "active",
    createdDate: "08 Jan 2025",
  },
  {
    id: 4,
    name: "Casework",
    description: "Custom cabinetry and casework installation.",
    status: "active",
    createdDate: "07 Jan 2025",
  },
  {
    id: 5,
    name: "Flooring",
    description: "Flooring installation and repair.",
    status: "inactive",
    createdDate: "06 Jan 2025",
  },
  {
    id: 6,
    name: "Bathrooms",
    description: "Bathroom remodeling and fixture installation.",
    status: "active",
    createdDate: "05 Jan 2025",
  },
  {
    id: 7,
    name: "Concrete",
    description: "Concrete pouring and finishing services.",
    status: "active",
    createdDate: "04 Jan 2025",
  },
  {
    id: 8,
    name: "Doors",
    description: "Door installation and repair.",
    status: "active",
    createdDate: "03 Jan 2025",
  },
  {
    id: 9,
    name: "Elevator",
    description: "Elevator installation and maintenance.",
    status: "active",
    createdDate: "02 Jan 2025",
  },
  {
    id: 10,
    name: "Extra",
    description: "Additional or miscellaneous services.",
    status: "inactive",
    createdDate: "01 Jan 2025",
  },
  {
    id: 11,
    name: "Landscape",
    description: "Landscaping and garden maintenance.",
    status: "active",
    createdDate: "31 Dec 2024",
  },
  {
    id: 12,
    name: "Plumbing",
    description: "Plumbing installation and repair.",
    status: "active",
    createdDate: "30 Dec 2024",
  },
];

type TaskType = {
  id: number;
  name: string;
  description: string;
  status: string;
  createdDate: string;
};

type ModalType = "add" | "edit" | "delete" | null;

export default function TaskTypes() {
  const [taskTypes, setTaskTypes] = useState<TaskType[]>(initialTaskTypes);
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType | null>(
    null
  );
  const [modalType, setModalType] = useState<ModalType>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const handleOpenModal = (type: ModalType, taskType?: TaskType) => {
    setModalType(type);
    if (type === "edit" && taskType) {
      setSelectedTaskType(taskType);
      setFormData({
        name: taskType.name,
        description: taskType.description,
        status: taskType.status,
      });
    } else if (type === "add") {
      setFormData({
        name: "",
        description: "",
        status: "active",
      });
    } else if (type === "delete" && taskType) {
      setSelectedTaskType(taskType);
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTaskType(null);
    setFormData({
      name: "",
      description: "",
      status: "active",
    });
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      const newTaskType: TaskType = {
        id: Math.max(...taskTypes.map((t) => t.id)) + 1,
        ...formData,
        createdDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      setTaskTypes([...taskTypes, newTaskType]);
    } else if (modalType === "edit" && selectedTaskType) {
      setTaskTypes(
        taskTypes.map((t) =>
          t.id === selectedTaskType.id ? { ...t, ...formData } : t
        )
      );
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedTaskType) {
      setTaskTypes(taskTypes.filter((t) => t.id !== selectedTaskType.id));
      handleCloseModal();
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "default";
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      <div className="flex justify-between items-center">
        <SearchableHeader name="Task Types" onlyLabel={true} />
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={() => handleOpenModal("add")}
        >
          Add Task Type
        </Button>
      </div>

      <Table>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {taskTypes.map((item, index) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {column.uid === "serial" ? (
                    <div className="text-sm text-default-600">{index + 1}</div>
                  ) : column.uid === "name" ? (
                    <div className="font-semibold">{item.name}</div>
                  ) : column.uid === "description" ? (
                    <div className="max-w-xs truncate">{item.description}</div>
                  ) : column.uid === "status" ? (
                    <Chip
                      size="sm"
                      color={getStatusColor(item.status)}
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  ) : column.uid === "createdDate" ? (
                    <div className="text-sm text-default-600">
                      {item.createdDate}
                    </div>
                  ) : column.uid === "actions" ? (
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        onPress={() => handleOpenModal("edit", item)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => handleOpenModal("delete", item)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center md:justify-end w-full">
        <PaginationClient
          totalPages={Math.ceil(taskTypes.length / 10)}
          currentPage={1}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalType === "add" || modalType === "edit"}
        onClose={handleCloseModal}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">
              {modalType === "add" ? "Add New Task Type" : "Edit Task Type"}
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Task Type Name"
                placeholder="Enter task type name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isRequired
              />

              <Input
                label="Description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                isRequired
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === "active"}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    />
                    <span className="text-sm">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === "inactive"}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    />
                    <span className="text-sm">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isDisabled={!formData.name.trim()}
            >
              {modalType === "add" ? "Add Task Type" : "Update Task Type"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalType === "delete"}
        onClose={handleCloseModal}
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-danger" size={24} />
              <h3 className="text-xl font-semibold">Confirm Delete</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="bg-default-100 dark:bg-default-50 p-4 rounded-lg">
              <p className="text-foreground mb-2">
                Are you sure you want to delete this task type?
              </p>
              {selectedTaskType && (
                <div className="text-sm text-default-600">
                  <p>
                    <strong>Name:</strong> {selectedTaskType.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedTaskType.description}
                  </p>
                </div>
              )}
              <p className="text-danger text-sm mt-3">
                This action cannot be undone.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete Task Type
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
