import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import cytoscape from "cytoscape";
// @ts-ignore
import dagre from "dagre";
// @ts-ignore
import cydagre from "cytoscape-dagre";

const siteA = {
  nodes: [
    { data: { id: "siteB" } },
    {
      data: {
        id: "sp5",
        label: "A",
        parent: "siteB",
        callCount: 10,
        delayMS: 100,
        url: "http://www.naver.com"
      },
      classes: "dagre-node"
    },
    {
      data: {
        id: "lf14",
        label: "B",
        parent: "siteB",
        callCount: 10,
        delayMS: 100
      },
      classes: "dagre-node"
    },
    {
      data: {
        id: "mf14",
        label: "C",
        parent: "siteB",
        callCount: 10,
        delayMS: 100
      },
      classes: "dagre-node"
    },
    {
      data: {
        id: "nf14",
        label: "D",
        parent: "siteB",
        callCount: 10,
        delayMS: 100
      },
      classes: "dagre-node"
    }
  ],
  edges: [
    {
      data: {
        source: "sp5",
        target: "lf14",
        callCount: 10,
        delayMS: 100,
        speed: 100,
        bw: 50
      }
    },
    {
      data: {
        source: "lf14",
        target: "mf14",
        callCount: 15,
        delayMS: 150,
        speed: 100,
        bw: 100
      }
    },
    {
      data: {
        source: "mf14",
        target: "nf14",
        callCount: 20,
        delayMS: 200,
        speed: 100,
        bw: 10
      }
    }
  ]
};

const elements ={
  nodes: [...siteA.nodes],
  edges: [...siteA.edges]
}

// @ts-ignore
const defaults = {
  // dagre algo options, uses default value on undefined
  nodeSep: 50, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: 300, // the separation between each rank in the layout
  rankDir: "TB", // 'TB' for top to bottom flow, 'LR' for left to right,
  ranker: "network-simplex", // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
  //'network-simplex', 'tight-tree' or 'longest-path'
  minLen: function (edge: any) {
    return 1;
  }, // number of ranks to keep between the source and target of the edge
  edgeWeight: function (edge: any) {
    return 1;
  }, // higher weight edges are generally made shorter and straighter than lower weight edges

  // general layout options
  fit: true, // whether to fit to viewport
  padding: 15, // fit padding
  spacingFactor: 1, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
  animate: false, // whether to transition the node positions
  animateFilter: function (node: any, i: any) {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  animationDuration: 5000, // duration of animation in ms if enabled
  animationEasing: "ease-out-expo", // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform: function (node: any, pos: any) {
    return pos;
  }, // a function that applies a transform to the final node position
  ready: function () {}, // on layoutready
  stop: function () {} // on layoutstop
};



cydagre(cytoscape, dagre);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('componentRef') componentRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    console.log("step1");

    const cy = cytoscape({
      container: this.componentRef?.nativeElement,
      boxSelectionEnabled: false,
      autounselectify: true,
      layout: {
        name: "dagre",
        ...defaults
      },
      zoom: 1,
      pan: { x: 0, y: 0 },
      minZoom: 0.1,
      maxZoom: 5,
      wheelSensitivity: 0.1,
      motionBlur: false,
      motionBlurOpacity: 0.5,
      pixelRatio: "auto",
      textureOnViewport: false,
      style: [
        {
          selector: "[label]",
          style: {
            label: "data(label)",
            color: "black",
            "text-valign": "center",
            "font-family": "Roboto"
          }
        },
        {selector: ".dagre-node", style: { width: 160, height: 160, "font-size": 40, "background-color": "red", shape: "roundrectangle"}}],
      elements
    });
    console.log(elements)
    console.log(elements)
    console.log("step2");
  }

}
