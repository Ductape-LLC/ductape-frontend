"use client";

import Dashboard_layout from "@/components/layouts/dashboard-layout";
import Apps_Layout from "@/components/layouts/apps_layout";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";

export default function Events({
  params: { id, eventId },
}: {
  params: { id: string; eventId: string };
}) {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Dashboard_layout activeTab="Apps">
      <Apps_Layout activeAppTab="Events" id={id}>
        <div>
          <div className="px-16 h-[110px] border-b bg-white flex items-center justify-between">
            <h1 className="text-grey font-bold text-3xl">Events</h1>
          </div>
        </div>

        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>
            <div className="px-16 pt-5">
              <div className="grid bg-white p-7 border border-white-400 rounded">
                <div className="flex items-center justify-between pb-4 border-b border-white-400 -mx-7 px-7">
                  <p className="font-bold text-xl">Event Details</p>
                  <Button
                    variant="secondary"
                    type="button"
                    className="font-semibold text-sm bg-white text-red px-7 rounded border border-red h-10"
                  >
                    Delete Event
                  </Button>
                </div>

                <div className="grid gap-7">
                  <div className="mt-5 flex items-center gap-9 w-full">
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="event_name"
                      >
                        Event Name
                      </Label>
                      <Field
                        as={Input}
                        className="mt-1"
                        id="event_name"
                        name="event_name"
                      />
                      <ErrorMessage
                        name="event_name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        className="text-grey font-semibold"
                        htmlFor="event_tag"
                      >
                        Event Tag
                      </Label>
                      <Field
                        as={Input}
                        className="mt-1"
                        id="event_tag"
                        name="event_tag"
                      />
                      <ErrorMessage
                        name="event_tag"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-9 w-full">
                    <div className="flex-1">
                      <Label
                        htmlFor="action"
                        className="text-grey font-semibold"
                      >
                        Action for this event
                      </Label>
                      <ReactSelect
                        id="action"
                        className="mt-1 text-sm !border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        classNamePrefix="react-select"
                        placeholder="Select action for this event"
                      />
                      <ErrorMessage
                        name="action"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label
                        htmlFor="setup_tag"
                        className="text-grey font-semibold"
                      >
                        Setup Type
                      </Label>
                      <ReactSelect
                        id="setup_tag"
                        className="mt-1 text-sm !border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        classNamePrefix="react-select"
                        placeholder="Choose Setup Type"
                      />
                      <ErrorMessage
                        name="setup_tag"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-grey" htmlFor="event_envs">
                      Event Environments
                    </Label>
                    <Field
                      as={Input}
                      className="mt-1"
                      id="event_envs"
                      name="event_envs"
                    />
                    <ErrorMessage
                      name="event_envs"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex-1">
                    <Label className="text-grey" htmlFor="description">
                      Event Description
                    </Label>

                    <Field
                      as={Textarea}
                      className="mt-1"
                      id="description"
                      name="description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <div className="border-b border-white-400">
                    <p className="text-primary font-semibold px-3.5 pb-2 border-b-primary border-b-[3px] inline-block">
                      Samples
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <Button className="font-semibold text-sm bg-primary text-white h-10 px-14 rounded">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </Apps_Layout>
    </Dashboard_layout>
  );
}
