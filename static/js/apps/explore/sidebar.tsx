/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Component for rendering the side bar of a subject page.
 */

import React from "react";

import { NamedTypedNode } from "../../shared/types";
import { randDomId } from "../../shared/util";

interface SidebarPropType {
  id: string;
  currentTopicDcid: string;
  place: string;
  cmpPlace: string;
  placeType: string;
  dc: string;
  exploreMore: string;
  /**
   * Categories from the page config.
   */
  childTopics: NamedTypedNode[];
  peerTopics: NamedTypedNode[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export function Sidebar(props: SidebarPropType): JSX.Element {
  return (
    <div id="subject-page-sidebar">
      <ul id="nav-topics" className="nav flex-column accordion">
        {props.peerTopics.map((topic, idx) => {
          const url = `/explore/#t=${topic.dcid}&p=${props.place}&pcmp=${props.cmpPlace}&pt=${props.placeType}&dc=${props.dc}&em=${props.exploreMore}`;
          const isCurrentTopic = topic.dcid == props.currentTopicDcid;
          // Do not display itself for "root".
          const isRootTopic = topic.dcid == "dc/topic/Root";
          // Also if root, promote the child topics to be categories.
          const childClassName = isRootTopic ? "nav-item category" : "nav-item";
          return (
            <div key={idx} className="topic-item">
              {!isRootTopic && (
                <a
                  className={`nav-item category ${
                    isCurrentTopic ? " highlight" : ""
                  }`}
                  key={idx}
                  href={url}
                  onClick={(): void => {
                    props.setQuery("");
                  }}
                >
                  {topic.name}
                </a>
              )}
              <div className="sub-topic-group">
                {isCurrentTopic &&
                  props.childTopics &&
                  props.childTopics.map((childTopic) => {
                    if (!childTopic.dcid || childTopic.dcid === topic.dcid) {
                      return;
                    }
                    const url = `/explore/#t=${childTopic.dcid}&p=${props.place}&pcmp=${props.cmpPlace}&pt=${props.placeType}&dc=${props.dc}&em=${props.exploreMore}`;
                    return (
                      <a
                        key={randDomId()}
                        className={childClassName}
                        href={url}
                        onClick={(): void => {
                          props.setQuery("");
                        }}
                      >
                        {childTopic.name}
                      </a>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
