# Button 【Design：Liu |UI：Xu |Develop：Wu】

The button is used to start an instant operation.

## When to use

An operation command is marked (or encapsulates a group), and the corresponding business logic is triggered in response to the user's click behavior.

## Button type

:::demo There are four types of buttons: primary button, secondary button, and dangerous button. The primary button appears at most once in the same operation area.
```js
render(){
 return(<div className="components-button-demo-basic">
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="danger">Danger</Button>
  </div>)
}
```

```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

```
:::


## Button size

:::demo The buttons are available in large, medium and small sizes.

Set the size of the buttons to large and small by setting the size to large and small. If `size` is not set, the size is medium.


```js

  state = {
    size: 'large',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div className="components-button-demo-size">
        <Button size="small">small</Button>
        <Button>middle</Button>
        <Button size="large">large</Button>
      </div>
    );
  }
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
```
:::

## API

Generate different button styles by setting the Button properties. The recommended order is：`type` -> `shape` -> `size` -> `loading` -> `disabled`

The properties of the button are described below：

| Attributes | Description | Type | Defaults |
| --- | --- | --- | --- |
| size | Set button size | Enum {'small', 'large', 'default'} | 'default' |
| type | Set button type | Enum {'primary', 'dashed', 'danger', 'default'} | 'default' |